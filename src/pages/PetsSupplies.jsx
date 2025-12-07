import axios from "axios";
import React, { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import Loader from "../components/Loader";

const PetSupplies = () => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  console.log(category);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/petssupplies")
      .then((result) => {
        setTimeout(() => {
          setPets(result.data);
          setLoading(false);
        }, 500);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/category-filtered-product?category=${category}`
      )
      .then((result) => {
        setPets(result.data);
      })
      .catch((error) => console.log(error));
  }, [category]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-5 my-14">
      <div className="flex flex-col md:flex-row items-center justify-between my-10">
        <h1 className="text-5xl font-bold  my-10">Pets & Supplies</h1>

        {/* Category */}
        <div>
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="select"
            className="select select-bordered md:w-[200px] w-[300px] focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}{" "}
      </div>{" "}
    </div>
  );
};

export default PetSupplies;
