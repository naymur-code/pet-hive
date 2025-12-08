import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const MyListing = () => {
  const [listing, setListing] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // NEW
  const { user } = useContext(AuthContext);
  // Load listings
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://pet-server1.vercel.app/my-listing?email=${user.email}`)
      .then((result) => setListing(result.data))
      .catch((error) => console.log(error));
  }, [user]);

  // Delete listing
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This listing will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://pet-server1.vercel.app/my-listing/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your listing has been removed.",
                "success"
              );
              setListing(listing.filter((item) => item._id !== id));
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  // Open update modal
  const handleUpdate = (item) => {
    setSelectedItem(item); // Pass data
    document.getElementById("my_modal_4").showModal();
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const id = e.target.id.value;
    const updatedData = {
      email: form.email.value,
      name: form.listingName.value,
      price: form.price.value,
      location: form.address.value,
      date: form.date.value,
      category: form.category.value,
      description: form.description.value,
    };

    axios
      .put(`https://pet-server1.vercel.app/petssupplies/${id}`, updatedData)
      .then((result) => {
        if (result.data.modifiedCount > 0) {
          // Update list correctly
          setListing((prev) =>
            prev.map((item) =>
              item._id === id ? { ...item, ...updatedData } : item
            )
          );

          Swal.fire("Updated!", "Listing updated successfully!", "success");

          document.getElementById("my_modal_4").close();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-8">My Listings</h1>

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="table table-zebra">
          <thead className="text-lg bg-gray-200">
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {listing.map((data) => (
              <tr key={data._id} className="hover">
                <td>
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16">
                        <img src={data?.image} alt="listing" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">{data.name}</div>
                      <div className="text-sm opacity-60">{data.email}</div>
                    </div>
                  </div>
                </td>

                <td>{data.category}</td>
                <td className="font-bold text-green-700">${data.price}</td>
                <td>{data.location}</td>
                <td>{data.date}</td>

                <td className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleUpdate(data)}
                    className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(data._id)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {listing.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  No listings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ SINGLE MODAL OUTSIDE TABLE */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-2xl mb-4">Update Listing</h3>

          {selectedItem && (
            <form
              onSubmit={handleUpdateSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div>
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  className="input input-bordered w-full mt-1"
                  readOnly
                />
              </div>

              <div>
                <label className="font-semibold">Product ID</label>
                <input
                  type="text"
                  name="id"
                  defaultValue={selectedItem._id}
                  readOnly
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="font-semibold">Product Name</label>
                <input
                  type="text"
                  name="listingName"
                  defaultValue={selectedItem.name}
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="font-semibold">Price</label>
                <input
                  type="text"
                  name="price"
                  defaultValue={selectedItem.price}
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-semibold">Address</label>
                <textarea
                  name="address"
                  defaultValue={selectedItem.location}
                  className="textarea textarea-bordered w-full mt-1"
                ></textarea>
              </div>

              <div>
                <label className="font-semibold">Pickup Date</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={selectedItem.date}
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="font-semibold">Category</label>
                <select
                  name="category"
                  defaultValue={selectedItem.category}
                  className="select select-bordered w-full"
                >
                  <option>Pets</option>
                  <option>Food</option>
                  <option>Accessories</option>
                  <option>Care_Products</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="font-semibold">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedItem.description}
                  className="textarea textarea-bordered w-full mt-1"
                ></textarea>
              </div>

              <div className="md:col-span-2 text-right">
                <button className="btn bg-blue-500 hover:bg-blue-600 text-white px-8">
                  Update
                </button>
              </div>
            </form>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm bg-red-500 text-white">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyListing;
