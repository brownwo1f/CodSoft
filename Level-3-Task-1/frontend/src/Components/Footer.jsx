import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="flex bg-white shadow-inner">
      <img className="h-96 w-96" src={logo}></img>
      <div className="flex w-full flex-col">
        <div className="grid w-full grid-cols-4 p-10">
          <div>
            <p className="pb-2 text-start text-lg font-bold">Get to Know Us</p>
            <ul className="flex flex-col gap-y-2 text-start ">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press Releases</li>
            </ul>
          </div>
          <div>
            <p className="pb-2 text-start text-lg font-bold">
              Connect with Us{" "}
            </p>
            <ul className="flex flex-col gap-y-2 text-start  ">
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Facebook</li>
            </ul>
          </div>
          <div>
            <p className="pb-2 text-start text-lg font-bold">
              Make Money with Us
            </p>
            <ul className="text-sart flex flex-col gap-y-2  ">
              <li>Sell on CodCart</li>
              <li>Sell under CodCart Accelerator</li>
              <li>Protect and Build Your Brand</li>
              <li>CodCart Global Selling</li>
              <li>Become an Affiliate</li>
            </ul>
          </div>
          <div>
            <p className="pb-2 text-start text-lg font-bold">Let Us Help You</p>
            <ul className="text-sart flex flex-col gap-y-2  ">
              <li>COVID-19 and CodCart</li>
              <li>Your Account</li>
              <li>Returns Centre</li>
              <li>100% Purchase Protection</li>
            </ul>
          </div>
        </div>
        <hr></hr>
        <div className="p-10">© 1996-2024, CodCart Inc. or its affiliates</div>
      </div>
    </div>
  );
};

export default Footer;
