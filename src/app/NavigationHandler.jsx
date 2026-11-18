import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "../utils/navigation";

const NavigationHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return null;
};

export default NavigationHandler;
