import React from "react";
import { FaCartPlus } from "react-icons/fa6";
import { FaTableList } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="grid grid-rows-2 justify-center gap-y-10 p-20">
      <Link to={"/addproduct"}>
        <div className="grid grid-rows-2">
          <FaCartPlus className="text-9xl" />
          <p className="text-2xl">Add Products</p>
        </div>
      </Link>
      <Link to={"/listproduct"}>
        <div className="grid grid-rows-2">
          <FaTableList className="pl-1 text-9xl" />
          <p className="text-2xl">List Products</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
