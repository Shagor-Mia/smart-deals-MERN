import React from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
// import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
// import { useAxios } from "../../hooks/useAxios";

const CreateProduct = () => {
  const { user } = useAuth();
  // const axiosInstance = useAxios();

  const secureAxios = useAxiosSecure();

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const price_max = e.target.max_price.value;
    const price_min = e.target.min_price.value;
    // console.log(max_price, min_price, title, image);

    const newProduct = {
      title,
      image,
      price_max,
      price_min,
      email: user.email,
      seller_name: user.displayName,
    };

    // axios.post(`https://smart-deals-ph-server.vercel.app/products`, newProduct).then((resData) => {
    //   console.log(resData.data);
    //   if (resData.data.insertedId) {
    //     Swal.fire({
    //       position: "center",
    //       icon: "success",
    //       title: "Your product added",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   }
    // });

    secureAxios.post("/products", newProduct).then((resData) => {
      console.log(resData.data);
    });
    // axiosInstance.post("/products", newProduct).then((resData) => {
    //   console.log(resData.data);
    // });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <Link
        to="/all-products"
        className="text-2xl font-bold flex justify-center items-center mb-6"
      >
        <ArrowLeft className="mr-2" /> Back To Products
      </Link>

      <h1 className="text-5xl font-bold text-center mb-8">
        Create a <span className="text-secondary">Product</span>
      </h1>

      <form
        onSubmit={handleCreateSubmit}
        className="w-full max-w-md bg-base-200 p-6 rounded-2xl shadow-lg"
      >
        <fieldset className="fieldset">
          <label className="label">Product Name</label>
          <input
            type="text"
            name="title"
            className="input"
            placeholder="Product Name"
          />

          <label className="label">Image URL</label>
          <input
            type="text"
            name="image"
            className="input"
            placeholder="Image"
          />

          <label className="label">Min Price</label>
          <input
            type="text"
            className="input"
            name="min_price"
            placeholder="Min price"
          />

          <label className="label">Max Price</label>
          <input
            type="text"
            className="input"
            name="max_price"
            placeholder="Max price"
          />

          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateProduct;
