import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BrandsContainer = () => {
  const { brands = [] } = useSelector((store) => store.brands);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-bg-surface/60 p-4 shadow sm:rounded-[24px] sm:p-6 md:p-8 lg:p-10">
      {/* Brands Grid */}
      <div className="relative grid grid-cols-2 gap-3 min-[420px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 sm:gap-4 lg:grid-cols-6 xl:grid-cols-8">
        {brands.slice(0, 8).map((brand) => (
          <Link
            key={brand._id || brand.name}
            to={`/brands/${brand.slug}`}
            className="group relative flex aspect-[1.25/1] cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-5 shadow transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:ring-2 hover:ring-primary/20 dark:hover:ring-primary sm:aspect-[1.15/1] sm:rounded-2xl sm:p-6"
          >
            {/* Dark Overlay */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-bg-card/20 opacity-0 transition-opacity duration-300 dark:opacity-100" />

            {/* Brand Logo */}
            <img
              src={brand.image?.image_url}
              alt={brand.name}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-300 will-change-transform group-hover:scale-110"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default React.memo(BrandsContainer);
