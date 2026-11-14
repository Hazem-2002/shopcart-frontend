import Hero from "./Components/Hero";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";

import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/thunks/login";
import { refreshToken } from "../../features/auth/thunks/refreshToken";

const Home = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(
      login({ email: "hazem.mahmoud.dev@gmail.com", password: "123456@aA" }),
    );
  };

  const handleRefresh = () => {
    dispatch(refreshToken());
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <Hero />
        <FeaturedProducts />
        <Button onClick={handleRefresh}>Refresh Token</Button>
        <Button onClick={handleLogin}>Login</Button>v
      </div>
    </>
  );
};

export default Home;
