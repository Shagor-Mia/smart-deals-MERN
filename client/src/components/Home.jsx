import React from "react";
import LatestProducts from "./LatestProducts";

const latestProducts = fetch(
  "https://smart-deals-ph-server.vercel.app/latest-products"
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <LatestProducts latestProducts={latestProducts} />
    </div>
  );
};

export default Home;
