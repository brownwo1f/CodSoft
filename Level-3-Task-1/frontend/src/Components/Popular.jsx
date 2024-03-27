import React, { useEffect, useState } from "react";
import Item from "./Item";

const Popular = () => {
  const [popular, setpopular] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/popular")
      .then((res) => res.json())
      .then((data) => setpopular(data));
  }, []);
  return (
    <div>
      <p className="px-20 pt-10 text-3xl font-bold">In Trend</p>
      <div className="grid grid-cols-4 gap-14 p-16">
        {popular.map((item) => {
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
