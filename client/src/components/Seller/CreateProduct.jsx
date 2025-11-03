import React from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const CreateProduct = () => {
  return (
    <div>
      <Link
        to={"/all-products"}
        className="text-2xl font-bold flex justify-center items-center"
      >
        <ArrowLeft /> Back To Products
      </Link>
      <h1></h1>
    </div>
  );
};

export default CreateProduct;
