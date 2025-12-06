import axios from "axios";
import React, { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import Loader from "../components/Loader";

const PetSupplies = () => {
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/petssupplies"
      )
      .then((result) => {
        setTimeout(() => {
          setPets(result.data);
          setLoading(false);
        }, 500);
      })
      .catch((error) => console.log(error));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-5 my-14">
      {" "}
      <h1 className="text-5xl font-bold  my-10">Pets & Supplies</h1>{" "}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}{" "}
      </div>{" "}
    </div>
  );
};

export default PetSupplies;
