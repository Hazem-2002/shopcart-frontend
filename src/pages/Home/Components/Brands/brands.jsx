import React from "react";

import BrandsHeader from "./Components/BrandsHeader";
import BrandsContainer from "./Components/BrandsContainer";

const Brands = () => {
  return (
    <section className="section-container">
      <BrandsHeader />
      <BrandsContainer />
    </section>
  );
};

export default React.memo(Brands);
