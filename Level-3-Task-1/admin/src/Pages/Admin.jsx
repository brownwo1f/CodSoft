import React from "react";
import Sidebar from "../Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../Components/AddProduct";
import ListProduct from "../Components/ListProduct";

const Admin = () => {
  return (
    <div className="flex">
      <div className=" w-1/4">
        <Sidebar />
      </div>
      <div className="w-2/3">
        <Routes>
          <Route path="/addproduct" element={<AddProduct />}></Route>
          <Route path="/listproduct" element={<ListProduct />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
