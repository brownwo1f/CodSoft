import React, { useContext } from "react";
import { HomeContext } from "../Context/HomeContext";
import { FaMinusCircle } from "react-icons/fa";
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
          <button className="my-5 w-full rounded-lg bg-blue-500 py-2 font-semibold text-white">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
