import React from "react";
import { use } from "react";
import ProductCard from "./ProductCard";

const LatestProducts = ({ latestProducts }) => {
  const products = use(latestProducts);
  return (
    <div>
      <h1 className="text-center md:text-5xl">Latest Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
