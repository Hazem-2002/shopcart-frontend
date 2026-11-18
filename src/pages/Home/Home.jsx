import Hero from "./Components/Hero";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";

const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-10">
        <Hero />
        <FeaturedProducts />
      </div>
    </>
  );
};

export default Home;
