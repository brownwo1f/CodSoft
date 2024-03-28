import React from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="flex h-auto w-full items-center justify-between bg-white px-16 py-1 shadow-md ">
      <div className="flex items-center gap-x-4 text-3xl font-bold">
        <img className="h-14 w-14" src={logo} />
        <p>CodCart</p>
        <p className="-mb-3 text-sm">Admin Panel</p>
      </div>
    </div>
  );
};

export default Navbar;
