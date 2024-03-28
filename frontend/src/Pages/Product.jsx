import React, { useContext, useState } from "react";
import { HomeContext } from "../Context/HomeContext";
import { useParams } from "react-router-dom";
import star from "../assets/star_icon.png";
import arrow from "../assets/breadcrum_arrow.png";

const Product = () => {
  window.scrollTo(0, 0);
  const { all_product } = useContext(HomeContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  const [size, setSize] = useState("M");
  const { addToCart } = useContext(HomeContext);

  return (
    <>
      <div className="flex gap-x-5 p-3">
        Home <img src={arrow} alt="" /> {product.category}{" "}
        <img src={arrow} alt="" /> {product.name}
      </div>
      <div className="mb-10 flex">
        <div className="left w-1/3 pl-40">
          <div className="my-10 w-full overflow-hidden rounded-lg">
            <img className="w-full object-contain" src={product.image} alt="" />
          </div>
          <div className="flex w-full gap-x-3">
            <div>
              <img className="rounded-lg" src={product.image} alt="" />
            </div>
            <div>
              <img className="rounded-lg" src={product.image} alt="" />
            </div>
            <div>
              <img className=" rounded-lg" src={product.image} alt="" />
            </div>
            <div>
              <img className=" rounded-lg" src={product.image} alt="" />
            </div>
          </div>
        </div>
        <div className="right m-10 flex w-1/2 flex-col gap-y-6">
          <p className="text-3xl font-bold">{product.name}</p>
          <div className="flex gap-x-3">
            <div className="flex">
              <img src={star} alt="" />
              <img src={star} alt="" />
              <img src={star} alt="" />
              <img src={star} alt="" />
              <img className="opacity-40" src={star} alt="" />
            </div>
            <p className="text-sm font-bold">1212 reviews</p>
          </div>
          <span className="flex gap-x-5">
            <p className="text-3xl font-semibold text-green-500">
              ${product.new_price}.00
            </p>
            <p className="text-xl font-semibold line-through">
              ${product.old_price}
            </p>
          </span>
          <p className="text-xl font-bold">Choose size</p>
          <div className="flex gap-x-4 ">
            {size === "S" ? (
              <div
                onClick={() => setSize("S")}
                className="h-9 w-9 rounded-full border-2 border-blue-500 bg-blue-500 pt-1 text-center font-semibold text-white shadow-sm"
              >
                S
              </div>
            ) : (
              <div
                onClick={() => setSize("S")}
                className="h-9 w-9 rounded-full border-2 border-blue-500 bg-white pt-1 text-center font-semibold shadow-sm"
              >
                S
              </div>
            )}
            {size === "M" ? (
              <div
                onClick={() => setSize("M")}
                className="h-9 w-9 rounded-full border-2 border-blue-500 bg-blue-500 pt-1 text-center font-semibold text-white shadow-sm"
              >
                M
              </div>
            ) : (
              <div
                onClick={() => setSize("M")}
                className="h-9 w-9 rounded-full border-2 border-blue-500 bg-white pt-1 text-center font-semibold shadow-sm"
              >
                M
              </div>
            )}
            {size === "L" ? (
              <div
                onClick={() => setSize("L")}
                className="h-9 w-9 rounded-full border-2 border-blue-500 bg-blue-500 pt-1 text-center font-semibold text-white shadow-sm"
              >
                L
              </div>
            ) : (
              <div
                onClick={() => setSize("L")}
                className="h-9 w-9 rounded-full border-2 border-blue-500 bg-white pt-1 text-center font-semibold shadow-sm"
              >
                L
              </div>
            )}
            {size === "XL" ? (
              <div
                onClick={() => setSize("XL")}
                className="h-9 w-9 rounded-full border-2 border-blue-500 bg-blue-500 pt-1 text-center font-semibold text-white shadow-sm"
              >
                XL
              </div>
            ) : (
              <div
                onClick={() => setSize("XL")}
                className="h-9 w-9 rounded-full border-2 border-blue-500 bg-white pt-1 text-center font-semibold shadow-sm"
              >
                XL
              </div>
            )}
          </div>
          <button
            onClick={() => addToCart(product.id)}
            className="text-md flex w-fit justify-center rounded-md bg-blue-500 px-5 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add To Cart
          </button>

          <p className="mt-6 text-lg text-gray-500">
            The Basic tee is an honest new take on a classic. The tee uses super
            soft, pre-shrunk cotton for true comfort and a dependable fit. They
            are hand cut and sewn locally, with a special dye technique that
            gives each tee it's own look.
          </p>
          <p className="font-mono font-semibold opacity-90">
            Category: {product.category.toUpperCase()}
          </p>
        </div>
      </div>
    </>
  );
};

export default Product;
