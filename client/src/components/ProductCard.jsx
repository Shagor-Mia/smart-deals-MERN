import React from "react";

const ProductCard = ({ product }) => {
  const { title, price_min, price_max, image } = product;
  return (
    <div className="card bg-base-100  shadow-sm">
      <figure className="px-4 pt-4">
        <img src={image} alt={title} className="rounded-xl w-full md:h-50" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title">{title}</h2>
        <p>
          Price: {price_min} - {price_max}
        </p>
        <div className="card-actions">
          <button className="btn btn-primary w-full">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
