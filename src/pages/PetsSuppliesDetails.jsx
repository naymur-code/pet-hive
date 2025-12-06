import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../components/Loader";

const PetsSuppliesDetails = () => {
  const [petDetails, setPetDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const { name, email, description, price, image, category, location,date } = petDetails;

  useEffect(() => {
    axios.get(`http://localhost:3000/petssupplies/${id}`).then((result) => {
      setTimeout(() => {
        setPetDetails(result.data);
        setLoading(false);
      }, 500);
    });
  }, [id]);

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
            <span className="font-semibold text-gray-900">Category:</span> {category}
          </p>

          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-900">Owner Email:</span> {email}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-900">Date:</span> {date}
          </p>

          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-900">Location:</span> {location}
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
          <button className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-semibold shadow-lg transition-all">
            🛒 Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetsSuppliesDetails;
