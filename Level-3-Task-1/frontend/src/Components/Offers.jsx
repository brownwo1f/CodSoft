import React, { useEffect, useState } from "react";
import Item from "./Item";

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/offers")
      .then((res) => res.json())
      .then((data) => setOffers(data));
  }, []);
  return (
    <div>
      <p className="px-20 pt-10 text-3xl font-bold">Great Offers!</p>
      <div className="grid grid-cols-4 gap-14 p-16">
        {offers.map((item) => {
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

export default Offers;
