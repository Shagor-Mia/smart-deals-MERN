import React from "react";
import LatestProducts from "./LatestProducts";

const latestProducts = fetch("http://localhost:4000/latest-products").then(
  (res) => res.json()
);

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <LatestProducts latestProducts={latestProducts} />
    </div>
  );
};

export default Home;
