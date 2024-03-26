import React from "react";
import new_collections from "../assets/new_collections";
import Item from "./Item";

const NewAdded = () => {
  return (
    <div>
      <p className="px-20 pt-10 text-3xl font-bold">Just Arrived</p>
      <div className="grid grid-cols-4 gap-14 p-16">
        {new_collections.map((item) => {
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

export default NewAdded;
