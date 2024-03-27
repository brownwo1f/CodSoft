import React, { useState } from "react";

const AddProduct = () => {
  const [image, setImage] = useState(false);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      await fetch("http://localhost:5000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Error Product Adding");
        });
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="grid w-1/2 gap-y-6 pt-20">
        <div className=" flex justify-between">
          <label className="text-lg font-semibold">Product Title</label>
          <input
            type="text"
            name="name"
            value={productDetails.name}
            onChange={changeHandler}
            className=" w-2/3 border  text-lg shadow-inner"
          ></input>
        </div>
        <div className=" flex justify-between ">
          <label className="text-lg font-semibold">MRP price</label>
          <input
            value={productDetails.old_price}
            name="old_price"
            onChange={changeHandler}
            type="text"
            required
            className="w-2/3 border  text-lg shadow-inner"
          ></input>
        </div>
        <div className=" flex justify-between">
          <label className="text-lg font-semibold">Discounted price</label>
          <input
            value={productDetails.new_price}
            name="new_price"
            onChange={changeHandler}
            type="text"
            required
            className=" w-2/3 border text-lg shadow-inner"
          ></input>
        </div>
        <div className="flex justify-between">
          <label className="text-lg font-semibold">Product Category</label>
          <select
            required
            name="category"
            value={productDetails.category}
            onChange={changeHandler}
            className=" w-2/3 border text-lg shadow-inner"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div className="flex justify-between">
          <label className="text-lg font-semibold">Image</label>
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            required
            className="w-2/3 border text-lg shadow-inner"
          ></input>
        </div>
        <button
          onClick={() => {
            Add_Product();
          }}
          className="rounded-lg bg-blue-500 p-2"
        >
          Add Product
        </button>
      </div>
      <div className="w-1/2 p-10">
        <img
          src={image ? URL.createObjectURL(image) : null}
          className="w-full rounded-lg object-cover"
        ></img>
      </div>
    </div>
  );
};

export default AddProduct;
