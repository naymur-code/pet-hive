import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const PetsSuppliesDetails = () => {
  const [petDetails, setPetDetails] = useState({});
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  console.log(user);

  const { name, email, description, price, image, category, location, date } =
    petDetails;

  useEffect(() => {
    axios.get(`http://localhost:3000/petssupplies/${id}`).then((result) => {
      setTimeout(() => {
        setPetDetails(result.data);
        setLoading(false);
      }, 500);
    });
  }, [id]);

  const handleOrderBtn = () => {
    document.getElementById("my_modal_4").showModal();
  };

  const submitOrder = (e) => {
    e.preventDefault();

    const form = e.target;

    const orderData = {
      buyerName: form.buyerName.value,
      buyerEmail: form.buyerEmail.value,
      listingId: form.listingId.value,
      listingName: form.listingName.value,
      quantity: form.quantity.value,
      price: form.price.value,
      address: form.address.value,
      date: form.date.value,
      phone: form.phone.value,
      notes: form.notes.value,
    };

    axios
      .post("http://localhost:3000/orders", orderData)
      .then(() => {
        Swal.fire({
          title: "🛒 Order Successful!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => console.log(error));

    form.reset();
    document.getElementById("my_modal_4").close();
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-100">
        {/* Left: Image Area */}
        <div className="w-full flex justify-center items-center">
          <div className="rounded-3xl overflow-hidden shadow-lg w-full max-w-md">
            <img
              src={image}
              alt={name}
              className="w-full h-[350px] object-cover"
            />
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-center space-y-5">
          <h1 className="text-4xl font-extrabold text-gray-800">{name}</h1>

          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-900">Category:</span>{" "}
            {category}
          </p>

          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-900">Owner Email:</span>{" "}
            {email}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-900">Date:</span> {date}
          </p>

          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-900">Location:</span>{" "}
            {location}
          </p>

          <p className="text-gray-800 leading-relaxed">
            <span className="font-semibold text-gray-900">Description:</span>
            <br /> {description}
          </p>

          {/* Price Box */}
          <div className="bg-gray-900 text-white px-6 py-3 rounded-xl w-fit shadow-md text-xl font-bold">
            Price: ${price}
          </div>

          {/* Button */}
          <button
            onClick={handleOrderBtn}
            className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-semibold shadow-lg transition-all"
          >
            🛒 Order Now
          </button>
        </div>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>open modal</button> */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-2xl mb-4">Place Your Order</h3>

          <form
            onSubmit={submitOrder}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Buyer Name */}
            <div>
              <label className="font-semibold">Buyer Name</label>
              <input
                type="text"
                name="buyerName"
                readOnly
                defaultValue={user?.displayName}
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* Buyer Email */}
            <div>
              <label className="font-semibold">Email</label>
              <input
                type="email"
                name="buyerEmail"
                readOnly
                defaultValue={user?.email}
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* Listing ID */}
            <div>
              <label className="font-semibold">Product ID</label>
              <input
                type="text"
                name="listingId"
                readOnly
                defaultValue={petDetails._id}
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* Listing Name */}
            <div>
              <label className="font-semibold">Product Name</label>
              <input
                type="text"
                name="listingName"
                readOnly
                defaultValue={petDetails.name}
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="font-semibold">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                readOnly={category === "pet"}
                defaultValue={category === "pet" ? 1 : 1}
                className="input input-bordered w-full mt-1"
              />
              {category === "pet" && (
                <p className="text-sm text-gray-500">
                  Pets can be ordered only once.
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="font-semibold">Price</label>
              <input
                type="text"
                name="price"
                readOnly
                defaultValue={petDetails.price}
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="font-semibold">Address</label>
              <textarea
                name="address"
                defaultValue={petDetails.location}
                required
                placeholder="Enter delivery or pickup address"
                className="textarea textarea-bordered w-full mt-1"
              ></textarea>
            </div>

            {/* Date */}
            <div>
              <label className="font-semibold">Pickup Date</label>
              <input
                type="date"
                defaultValue={petDetails.date}
                name="date"
                required
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-semibold">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Enter phone number"
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* Additional Notes */}
            <div className="md:col-span-2">
              <label className="font-semibold">Notes</label>
              <textarea
                name="notes"
                placeholder="Additional instructions (optional)"
                className="textarea textarea-bordered w-full mt-1"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <button className="btn btn-info px-8">Submit Order</button>
            </div>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-error">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PetsSuppliesDetails;
