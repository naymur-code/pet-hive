import React from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import RecentListings from "../components/RecentListings";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <RecentListings />
    </div>
  );
};

export default Home;
