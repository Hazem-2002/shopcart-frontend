import React from "react";

import BrandsHeader from "./Components/BrandsHeader";
import BrandsContainer from "./Components/BrandsContainer";

const Brands = () => {
  return (
    <section className="mx-auto w-[98%] overflow-hidden p-4 md:container min-w-[90%]">
      <BrandsHeader />
      <BrandsContainer />
    </section>
  );
};

export default React.memo(Brands);
