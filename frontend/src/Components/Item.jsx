import React from "react";
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <Link to={`/product/${props.id}`}>
      <div className="flex flex-col justify-center overflow-hidden rounded-xl duration-150 hover:-translate-y-4 hover:shadow-xl ">
        <img className="h-80 object-contain " src={props.image} />
        <div className="p-2">
          <p className="w-72  font-semibold">{props.name}</p>
          <div className="text-2xl font-semibold text-green-500">
            ${props.new_price}
          </div>
          <div className="text=xl font-semibold line-through">
            ${props.old_price}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
