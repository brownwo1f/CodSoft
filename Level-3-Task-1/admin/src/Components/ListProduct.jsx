import React, { useEffect, useState } from "react";
import { FaSkullCrossbones } from "react-icons/fa";

const ListProduct = () => {
  const [allProducts, setAllproducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:5000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllproducts(data);
      });
  };

  const handleRemove = async (id) => {
    await fetch("http://localhost:5000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      <p className="py-7 text-4xl font-bold">All Product List</p>
      <div className="grid grid-cols-12 gap-x-5 text-lg font-semibold">
        <p className="col-span-2">Products</p>
        <p className="col-span-3">Title</p>
        <p className="col-span-2">MRP Price</p>
        <p className="col-span-2">Offer Price</p>
        <p className="col-span-2">Category</p>
        <p className="col-span-1">Remove</p>
      </div>
      <div className="py-6">
        <hr />
        {allProducts.map((item, i) => {
          return (
            <>
              <div key={i} className="grid grid-cols-12 items-center gap-x-5">
                <img
                  className="col-span-2 m-2 h-48 w-48 rounded-lg"
                  src={item.image}
                ></img>
                <p className="col-span-3">{item.name}</p>
                <p className="col-span-2">${item.old_price}</p>
                <p className="col-span-2">${item.new_price}</p>
                <p className="col-span-2">{item.category}</p>
                <div className="col-span-1 text-5xl text-red-600">
                  <FaSkullCrossbones
                    onClick={() => {
                      handleRemove(item.id);
                    }}
                  />
                </div>
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
