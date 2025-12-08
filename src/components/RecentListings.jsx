import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import PetCard from "../components/PetCard";

const RecentListings = () => {
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  useEffect(() => {
    axios
      .get("https://pet-server1.vercel.app/petssupplies")
      .then((result) => {
        setTimeout(() => {
          setPets(result.data);
          setLoading(false);
          setLoading(false);
        }, 500);
      })
      .catch((error) => console.log(error));
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto px-5 my-20">
      <div className="text-center my-10">
        <h1 className="md:text-4xl text-3xl font-bold my-2">Recent Listings</h1>
        <p>find everything your pet needs in one place.</p>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 justify-between gap-10">
        {pets.slice(0, 6).map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default RecentListings;
