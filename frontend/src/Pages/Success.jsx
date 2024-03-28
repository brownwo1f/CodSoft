import React from "react";
import { Link } from "react-router-dom";
import { FcApproval } from "react-icons/fc";

const Success = () => {
  return (
    <div className="mx-auto my-16 flex flex-col items-center justify-center gap-y-10">
      <p className="flex items-center justify-center gap-x-4 p-2 text-5xl font-bold">
        <FcApproval className="-mb-2" />
        Payment Successful
      </p>
      <Link to={"/"}>
        <button className="mb-1 rounded-lg bg-blue-500 px-8 py-3 text-xl font-bold text-white">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default Success;
