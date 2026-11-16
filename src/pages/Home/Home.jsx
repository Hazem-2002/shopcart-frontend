import Hero from "./Components/Hero";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";

import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { refreshToken } from "../../features/auth/thunks/refreshToken";

const Home = () => {
  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(refreshToken());
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <Hero />
        <FeaturedProducts />
        <Button onClick={handleRefresh}>Refresh Token</Button>
      </div>
    </>
  );
};

export default Home;
