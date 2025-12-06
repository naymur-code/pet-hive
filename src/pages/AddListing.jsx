import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const AddListing = () => {
  const { user } = useContext(AuthContext);
  const handleAddProduct = (e) => {
    e.preventDefault();
    const from = e.target;
    const name = from.name.value;
    const category = from.select.value;
    const price = from.price.value;
    const location = from.location.value;
    const image = from.imageUrl.value;
    const date = from.date.value;
    const email = from.email.value;
    const description = from.description.value;
    const newProduct = {
      name,
      price,
      category,
      image,
      description,
      date,
      email,
      location,
    };

    axios
      .post("http://localhost:3000/petssupplies", newProduct)
      .then((result) => {
        console.log(result);
        from.reset();
        Swal.fire({
          title: "New pets Supplies Add Success!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div>
        <div className="flex justify-center items-center flex-col mt-10">
          <h3 className="my-2 text-4xl font-semibold ">
            <span className="text-blue-400">Add </span> Listing
          </h3>
          <p>Sign in to continue to Pethive</p>
        </div>

        <div className="flex justify-center items-center my-8">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border border-gray-200">
            <div className="card-body">
              <form onSubmit={handleAddProduct}>
                <fieldset className="fieldset gap-3">
                  <label className="label">Product/Pet Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input"
                    placeholder=""
                  />

                  <label className="label">Category</label>
                  <select
                    name="select"
                    defaultValue="Pick a browser"
                    className="select"
                  >
                    <option disabled={true}> pet selected</option>
                    <option>Pets</option>
                    <option>Food</option>
                    <option>Accessories</option>
                    <option>Care_Products</option>
                  </select>

                  <label className="label">Price </label>
                  <input
                    name="price"
                    type="number"
                    className="input"
                    placeholder="0"
                  />

                  <label className="label">Location</label>
                  <input
                    name="location"
                    type="text"
                    className="input"
                    placeholder=""
                  />

                  <label className="label">imageUrl</label>
                  <input
                    name="imageUrl"
                    type="text"
                    className="input"
                    placeholder=""
                  />

                  <label className="label">Date (Pick Up)</label>
                  <input
                    name="date"
                    type="date"
                    className="input"
                    placeholder=""
                  />

                  <label className="label">current user email </label>
                  <input
                    name="email"
                    type="text"
                    defaultValue={user?.email}
                    className="input"
                    placeholder=""
                  />

                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Description</legend>
                    <textarea
                      name="description"
                      className="textarea h-24"
                      placeholder="details"
                    ></textarea>
                  </fieldset>

                  <button className="btn btn-info mt-4">Add Product</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
