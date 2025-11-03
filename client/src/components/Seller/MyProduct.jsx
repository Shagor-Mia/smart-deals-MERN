import React from "react";

const MyProduct = () => {
  return (
    <div>
      <h3 className="text-5xl">MyBids </h3>
      <div className="overflow-x-auto">
        <table className="table border ">
          {/* head */}
          <thead>
            <tr className="border">
              <th className="border">SL No.</th>
              <th className="border">Image</th>
              <th className="border">ProductName</th>
              <th className="border">Category</th>
              <th className="border">Price</th>
              <th className="border">Status</th>
              <th className="border pl-10">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{1}</th>
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
                </div>
              </td>
              <td>
                <div className="font-bold">ProductName</div>
              </td>
              <td>
                category
                <br />
              </td>
              <td>$price</td>
              <td>
                {/* {bid.status === "pending" ? (
                  <div className="badge badge-warning pb-1">{bid.status}</div>
                ) : (
                  <div className="badge badge-success pb-1">{bid.status}</div>
                )} */}
                pending
              </td>
              <td className=" border">
                <div className="">
                  <button
                    // onClick={() => handleDeleteBid(bid._id)}
                    className="btn btn-outline btn-xs"
                  >
                    edit
                  </button>
                  <button
                    // onClick={() => handleDeleteBid(bid._id)}
                    className="btn btn-outline btn-xs"
                  >
                    remove
                  </button>
                  <button
                    // onClick={() => handleDeleteBid(bid._id)}
                    className="btn btn-outline btn-xs"
                  >
                    mark sold
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProduct;
