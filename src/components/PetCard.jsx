import React from "react";
import { Link } from "react-router";

const PetCard = ({pet}) => {
    console.log(pet);
  return (
    <div whileHover={{ scale: 1.1 }} className="card bg-base-100  shadow-sm">
      <figure>
        <div className="absolute top-2 right-2">
          <button className="btn btn-md btn-info">${pet?.price}</button>
        </div>
        <img
          src={pet?.image}
          alt="Shoes"
          className=""
        />
      </figure>
      <div className="card-body md:px-10 py-6">
        <div className="flex justify-start">
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold">{""} </p>
          </div>
        </div>
        <h2 className="card-title">{pet?.name}</h2>
        <p>{pet?.description}</p>

        <div className="card-actions justify-end">
          <Link to={`/service/${"serviceId"}`} className="btn btn-info w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
