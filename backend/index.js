const port = 5000;
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const crypto = require("crypto");
const RazorPay = require("razorpay");

const app = express();
app.use(express.json());
app.use(cors());

//!db connection
const uri = process.env.DBURL;
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to DB");
  } catch (error) {
    console.log("DB connection failed");
  }
};
//!

//! Image storage
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.filename}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});
//!

//!Schemas
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  available: {
    type: Boolean,
    default: true,
  },
});

//? addproduct
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  await product.save();
  res.json({
    success: true,
    name: req.body.name,
  });
});

//? remove product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({
    success: true,
    name: req.body.name,
  });
});

//? get all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});
//!

//! user Model
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

//? signup
app.post("/signup", async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "email already registered" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "sudbslajfad");
  res.json({ success: true, token });
});

//? signin
app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "sudbslajfad");
      res.json({ success: true, token });
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
});
//!

//! newCollection data
app.get("/newcollection", async (req, res) => {
  let products = await Product.find({});
  let newCollection = products.slice(1).slice(-8);
  res.send(newCollection);
});
//!

//! offers data
app.get("/offers", async (req, res) => {
  let products = await Product.find({});
  let offers = products.slice(13, 21);
  res.send(offers);
});
//!

//! popular data
app.get("/popular", async (req, res) => {
  let products = await Product.find({});
  let popular = products.slice(6, 18);
  res.send(popular);
});
//!

//! fetch user middleware
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Token not present" });
  } else {
    try {
      const data = jwt.verify(token, "sudbslajfad");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: "token not valid" });
    }
  }
};
//!

//! add to cart
app.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  ); //? finds using first object arg, update second object arg
});
//!

//! remove from cart
app.post("/removefromcart", fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  ); //? finds using first object arg, update second object arg
});
//!

//! get cart
app.post("/getcart", fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});
//!

//! razoypay stuff
const razorpay = new RazorPay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.post("/payment", async (req, res) => {
  const { totalAmt } = req.body;
  const order = await razorpay.orders.create({
    amount: Number(totalAmt) * 100,
    currency: "USD",
  });
  res.json(order);
});

app.post("/payment-verification", async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body_data = razorpay_order_id + "|" + razorpay_payment_id;

  const expect = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body_data)
    .digest("hex");

  const isValid = expect === razorpay_signature;
  if (isValid) {
    res.redirect("http://localhost:5173/success");
    return;
  } else {
    res.redirect("http://localhost:5173/success");
    return;
  }
});

//!
app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcom to server" });
});

connectDB();
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on ", port);
  } else {
    console.log(error);
  }
});
