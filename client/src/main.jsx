import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import App from "./App.jsx";
import RootLayout from "./layout/RootLayout.jsx";
import Home from "./components/Home.jsx";
import AllProducts from "./components/AllProducts.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import Register from "./components/Register.jsx";
import MyBids from "./components/MyBids.jsx";
import MyProducts from "./components/MyProducts.jsx";
import Login from "./components/Login.jsx";
import ProductDetails from "./components/ProductDetails.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-products",
        Component: AllProducts,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/my-bids",
        Component: MyBids,
      },
      {
        path: "/my-products",
        Component: MyProducts,
      },
      {
        path: "/product-details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:4000/products/${params.id}`),
        Component: ProductDetails,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>
);
