import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const AddListing = () => {
  const { user } = useContext(AuthContext);
  const [okay, setOkay] = useState(false);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const from = e.target;
    const newProduct = {
      name: from.name.value,
      category: from.select.value,
      price: from.price.value,
      location: from.location.value,
      image: from.imageUrl.value,
      date: from.date.value,
      email: from.email.value,
      description: from.description.value,
    };

    axios
      .post("http://localhost:3000/petssupplies", newProduct)
      .then(() => {
        from.reset();
        Swal.fire({
          title: "New Pet Supply Added Successfully!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className=" bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      {" "}
      <div className="text-center mb-8">
        {" "}
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          {" "}
          <span className="text-blue-500">Add</span> Listing{" "}
        </h1>{" "}
        <p className="text-gray-600">Sign in to continue to Pethive</p>{" "}
      </div>
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <form onSubmit={handleAddProduct} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Product Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Product/Pet Name
              </label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter product/pet name"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Category
              </label>
              <select
                onChange={(e) => {
                  e.target.value == "Pets" ? setOkay(true) : setOkay(false);
                }}
                name="select"
                className="select select-bordered w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option disabled selected>
                  Choose category
                </option>
                <option>Pets</option>
                <option>Food</option>
                <option>Accessories</option>
                <option>Care_Products</option>
              </select>
            </div>

            {/* Price */}
            {okay ? (
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Price
                </label>
                <input
                  name="price"
                  value={0}
                  disabled
                  type="number"
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="0"
                />
              </div>
            ) : (
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Price
                </label>
                <input
                  name="price"
                  type="number"
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="0"
                />
              </div>
            )}

            {/* Location */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Location
              </label>
              <input
                name="location"
                type="text"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter location"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Image URL
              </label>
              <input
                name="imageUrl"
                type="text"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter image URL"
              />
            </div>

            {/* Pick Up Date */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Pick Up Date
              </label>
              <input
                name="date"
                type="date"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* User Email */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-gray-700">
                Current User Email
              </label>
              <input
                name="email"
                type="email"
                defaultValue={user?.email}
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full h-24 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Details about the product"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-info w-full py-3 text-lg font-semibold"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
