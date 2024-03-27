import React, { useContext } from "react";
import { HomeContext } from "../Context/HomeContext";
import Item from "../Components/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(HomeContext);
  return (
    <>
      <div>
        <img className="w-full object-cover" src={props.banner} alt="" />
      </div>
      <p className="px-20 pt-10 text-3xl font-bold">
        Shop for {props.category.toUpperCase()}
      </p>
      <div className="grid grid-cols-4 gap-14 p-16">
        {all_product.map((item, i) => {
          if (props.category == item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                image={item.image}
                name={item.name}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default ShopCategory;
