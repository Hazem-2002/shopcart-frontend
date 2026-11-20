import Hero from "./Components/Hero";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import FeaturedCategories from "./Components/FeaturedCategories/FeaturedCategories";

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col gap-16 sm:gap-20 lg:gap-24 xl:gap-28">
        <Hero />
        <FeaturedProducts />
        <FeaturedCategories />
      </div>
    </>
  );
};

export default Home;
