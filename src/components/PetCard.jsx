import React from "react";
import { Link } from "react-router";

const PetCard = ({ pet }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative h-76 w-full">
        <img
          src={pet?.image}
          alt={pet?.name}
          className="w-full h-full object-cover"
        />

        {/* Price Badge */}
        <span className="absolute top-3 right-3 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
          ${pet?.price}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold text-gray-800">{pet?.name}</h2>

        <p className="text-gray-600 text-sm line-clamp-2">{pet?.description}</p>

        {/* Action Button */}
        <Link
          to={`/petssupplies/${pet?._id}`}
          className="block w-full text-center py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
