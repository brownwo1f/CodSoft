import React, { useContext, useState } from "react";
import { HomeContext } from "../Context/HomeContext";
import { FaMinusCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import { FaPlusCircle } from "react-icons/fa";

const Cart = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartItem,
    addToCart,
    removeFromCart,
  } = useContext(HomeContext);

  const { mrpAmt, totalAmt, discount } = getTotalCartAmount();

  const [data, setData] = useState({});

  const handleCheckout = async (Amt) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      await fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalAmt: Amt }),
      })
        .then((res) => res.json())
        .then((data) => setData(data));
    }
    var options = {
      key: "rzp_test_4dpeg6zwlKDqZU", // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "CodCart Inc.",
      description: "Test Transaction",
      image: logo,
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:5000/payment-verification",
      prefill: {
        name: "Deepak Chauhan",
        email: "email@gmail.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  return (
    <>
      <p className="p-10 text-4xl font-bold">Your CodCart</p>
      <div className="mx-10 my-3 flex h-screen gap-x-3">
        <div className="w-2/3">
          {all_product.map((item, i) => {
            if (cartItem[item.id] > 0) {
              return (
                <div key={i} className="  grid grid-cols-8 rounded-lg border">
                  <div className="p-4">
                    <img
                      className="h-30 w-20 rounded-lg"
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div className="col-span-4 my-3 text-lg font-semibold">
                    <p>{item.name}</p>
                    <p className="text-green-500">${item.new_price}</p>
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <FaMinusCircle
                      onClick={() => removeFromCart(item.id)}
                      className="mx-2 text-xl"
                    />
                    <div className="w-24 rounded-md border text-center">
                      {cartItem[item.id]}
                    </div>
                    <FaPlusCircle
                      onClick={() => addToCart(item.id)}
                      className="mx-2 text-xl"
                    />
                  </div>
                  <div className="text-md mr-12 flex flex-col items-center justify-center font-semibold">
                    <p>Sub Total</p>
                    <p>${item.new_price * cartItem[item.id]}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="sticky top-5 flex h-fit w-1/3 flex-col items-center rounded-lg border p-2 px-10 py-6">
          <p className="mb-6 text-3xl font-bold">Total</p>
          <span className="flex w-full justify-between text-lg">
            <p>MRP Total</p>
            <p>${mrpAmt}</p>
          </span>
          <div className="my-3 w-full border border-neutral-800 bg-neutral-800 "></div>
          <span className="flex w-full justify-between text-lg">
            <p>Discounts</p>
            <p className="text-green-500"> -${discount}</p>
          </span>
          <div className="my-3 w-full border border-neutral-800 bg-neutral-800 "></div>
          <span className="flex w-full justify-between text-lg">
            <p>Delivery Charges</p>
            <p className="text-green-500">Free</p>
          </span>
          <div className="my-3 w-full border-4 border-neutral-800 bg-neutral-800"></div>
          <span className="flex w-full justify-between text-xl font-bold">
            <p>Total</p>
            <p>${totalAmt}</p>
          </span>
          <button
            onClick={() => {
              handleCheckout(totalAmt);
            }}
            className="my-5 w-full rounded-lg bg-blue-500 px-5 py-2 font-semibold text-white"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
