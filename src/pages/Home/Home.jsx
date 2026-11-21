import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Components
import Hero from "./Components/Hero";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import FeaturedCategories from "./Components/FeaturedCategories/FeaturedCategories";
import WhyChooseUs from "./Components/WhyChooseUs/WhyChooseUs";

// Thunks
import { fetchCategories } from "../../features/categories/thunks/fetchCategories.js";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <div className="flex w-full flex-col gap-16 sm:gap-20 lg:gap-24 xl:gap-28">
        <Hero />
        <FeaturedProducts />
        <FeaturedCategories />
        <WhyChooseUs />
      </div>
    </>
  );
};

export default React.memo(Home);
