import React, { use, useRef } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";

const ProductDetails = () => {
  const { user } = use(AuthContext);
  const { _id } = useLoaderData();
  const bidModalRef = useRef();
  const [bids, setBids] = useState([]);

  const handleBidModal = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    console.log(_id, user.photoURL, name, email, bid);

    const newBid = {
      product: _id,
      buyer_name: name,
      buyer_image: user.photoURL,
      buyer_email: email,
      bid_price: bid,
      status: "pending",
    };

    fetch(`http://localhost:4000/bids`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your bid has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          // this wont work because in database price is saved as string
          newBids.sort((a, b) => a.bid_price - b.bid_price);
          setBids(newBids);
        }
      });
  };

  useEffect(() => {
    fetch(`http://localhost:4000/products/bids/${_id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data after bids", data);
        setBids(data);
      });
  }, [_id]);

  return (
    <div>
      {/* product info */}
      <div>
        <div></div>
        <div>
          {/* show modal */}
          <button onClick={handleBidModal} className="btn btn-primary">
            i want to buy this
          </button>

          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Give Seller Best Offer!</h3>
              <p className="py-4">Offer something that seller cant resist.</p>
              <form onSubmit={handleBidSubmit}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Name"
                    readOnly
                    defaultValue={user?.displayName}
                  />
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                    readOnly
                    defaultValue={user?.email}
                  />
                  <label className="label">Bid Price</label>
                  <input
                    type="text"
                    className="input"
                    name="bid"
                    placeholder="your bid"
                  />

                  <button type="submit" className="btn btn-neutral mt-4">
                    Login
                  </button>
                </fieldset>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      {/* bids for this product */}
      <div>
        <h3 className="text-3xl">
          Bids for this product:{" "}
          <span className="text-secondary">{bids.length}</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No.</th>
                <th>BuyerName</th>
                <th>BuyerEmail</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {bid.buyer_email}
                    <br />
                  </td>
                  <td>${bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
