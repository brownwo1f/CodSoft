import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import cart from "../assets/cart_icon.png";
import { HomeContext } from "../Context/HomeContext";

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartItems } = useContext(HomeContext);
  return (
    <div className="flex h-auto w-full items-center justify-between bg-white px-16 py-1 shadow-md ">
      <Link to="/">
        <div className="flex items-center gap-x-4 text-3xl font-bold">
          <img className="h-14 w-14" src={logo} />
          <p>CodCart</p>
        </div>
      </Link>

      <ul className="flex cursor-pointer gap-x-8 text-lg font-semibold text-neutral-500 ">
        <li
          onClick={() => {
            setMenu("Home");
          }}
        >
          <Link to="/">Home</Link>
          {menu === "Home" ? (
            <hr className="w-full rounded-full border-none bg-blue-500 pt-1" />
          ) : null}
        </li>
        <li
          onClick={() => {
            setMenu("Men");
          }}
        >
          <Link to="/men">Men</Link>
          {menu === "Men" ? (
            <hr className="w-full rounded-full border-none bg-blue-500 pt-1" />
          ) : null}
        </li>
        <li
          onClick={() => {
            setMenu("Women");
          }}
        >
          <Link to="/women">Women</Link>
          {menu === "Women" ? (
            <hr className="w-full rounded-full border-none bg-blue-500 pt-1" />
          ) : null}
        </li>
        <li
          onClick={() => {
            setMenu("Kids");
          }}
        >
          <Link to="/kids">Kids</Link>
          {menu === "Kids" ? (
            <hr className="w-full rounded-full border-none bg-blue-500 pt-1" />
          ) : null}
        </li>
      </ul>
      <div className="flex gap-x-8 text-xl font-semibold">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.clear();
              window.location.replace("/");
            }}
            className="rounded-full border-2 border-blue-500 px-4 pb-1 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="rounded-full border-2 border-blue-500 px-4 pb-1 text-blue-500 hover:bg-blue-500 hover:text-white">
              Login
            </button>
          </Link>
        )}

        <Link to="/cart">
          <div className="flex">
            <img className="h-8 w-8" src={cart}></img>
            <div className="-ml-2 h-fit w-fit rounded-full bg-red-500 px-1 text-xs text-white ">
              {getTotalCartItems()}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
