import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Components
import Hero from "./Components/Hero";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import FeaturedCategories from "./Components/FeaturedCategories/FeaturedCategories";
import WhyChooseUs from "./Components/WhyChooseUs/WhyChooseUs";
import Brands from "./Components/Brands/brands.jsx";

// Thunks
import { fetchCategories } from "../../features/categories/thunks/fetchCategories.js";
import { fetchBrands } from "../../features/brands/thunks/fetchBrands.js";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <>
      <div className="flex w-full flex-col gap-16 sm:gap-20 lg:gap-24 xl:gap-28">
        <Hero />
        <FeaturedProducts />
        <FeaturedCategories />
        <WhyChooseUs />
        <Brands />
      </div>
    </>
  );
};

export default React.memo(Home);
