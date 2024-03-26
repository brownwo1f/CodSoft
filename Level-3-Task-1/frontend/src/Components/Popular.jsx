import React from "react";
import { data_product } from "../assets/data";
import Item from "./Item";

const Popular = () => {
  return (
    <div>
      <p className="px-20 pt-10 text-3xl font-bold">Popular in Fashion</p>
      <div className="flex justify-around p-10">
        {data_product.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
