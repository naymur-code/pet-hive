import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import PetCard from "../components/PetCard";

const FilteredProduct = () => {
  const [petssupplies, setPetssupplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pets } = useParams();
  useEffect(() => {
    axios
      .get(
        `https://pet-server1.vercel.app/category-filtered-product?category=${pets}`
      )
      .then((result) => {
        setTimeout(() => {
          setPetssupplies(result.data);
          setLoading(false);
        }, 500);
      })
      .catch((error) => console.log(error));
  }, [pets]);

  if (loading) {
    return <Loader />;
  }
  if (petssupplies.length == 0) {
    return (
      <h2 className=" md:my-80 my-60 md:text-4xl text-3xl font-bold text-red-400 text-center">
        No products found for the selected category!
      </h2>
    );
  }
  return (
    <div className="container mx-auto px-5">
      <h1 className="md:text-5xl text-3xl font-bold  md:my-14 my-10">
        {" "}
        <span className="text-blue-500">{pets}</span> Category
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        {petssupplies.map((data) => (
          <PetCard key={data._id} pet={data} />
        ))}
      </div>
    </div>
  );
};

export default FilteredProduct;
