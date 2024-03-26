import React from "react";
import Hero from "../Components/Hero";
import Popular from "../Components/Popular";
import Offers from "../Components/Offers";
import NewAdded from "../Components/NewAdded";

const Home = () => {
  return (
    <>
      <Hero />
      <Popular />
      <Offers />
      <NewAdded />
    </>
  );
};

export default Home;
