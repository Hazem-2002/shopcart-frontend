import React from "react";

const FeaturedCategoriesHeader = () => {
  return (
    <div className="mx-auto flex flex-col items-center px-3 text-center">
      {/* Eyebrow */}
      <div className="mb-4 flex items-center gap-2.5 sm:mb-5 sm:gap-3">
        <span className="h-px w-7 bg-gradient-to-r from-transparent to-primary sm:w-10 md:w-12" />

        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary sm:text-[10px] sm:tracking-[0.2em] md:text-[11px] md:tracking-[0.22em]">
          Explore & Discover
        </span>

        <span className="h-px w-7 bg-gradient-to-l from-transparent to-primary sm:w-10 md:w-12" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-text-primary min-[400px]:text-[28px] sm:text-3xl md:text-4xl lg:text-[44px]">
        Shop by{" "}
        <span className="bg-gradient-to-r from-primary via-primary-active to-primary bg-clip-text text-transparent">
          Category
        </span>
      </h2>

      {/* Description */}
      <p className="mt-2 text-[11px] leading-5 text-text-secondary min-[400px]:text-xs sm:mt-3 sm:text-sm sm:leading-6 md:text-base md:leading-7">
        Explore our handpicked collections and discover everything you need, all
        in one place.
      </p>

      {/* Decorative Accent */}
      <div className="mt-5 h-1 w-10 rounded-full bg-gradient-to-r from-primary/40 to-primary sm:mt-6 sm:w-12" />
    </div>
  );
};

export default React.memo(FeaturedCategoriesHeader);
