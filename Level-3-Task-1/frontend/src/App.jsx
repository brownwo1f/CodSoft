import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ShopCategory from "./Pages/ShopCategory";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer";
import menBanner from "/src/assets/banner_mens.png";
import womenBanner from "/src/assets/banner_women.png";
import kidsBanner from "/src/assets/banner_kids.png";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/men"
            element={<ShopCategory banner={menBanner} category="men" />}
          ></Route>
          <Route
            path="/women"
            element={<ShopCategory banner={womenBanner} category="women" />}
          ></Route>
          <Route
            path="/kids"
            element={<ShopCategory banner={kidsBanner} category="kids" />}
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />}></Route>
          </Route>
          <Route path="/login" element={<LoginSignup />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
