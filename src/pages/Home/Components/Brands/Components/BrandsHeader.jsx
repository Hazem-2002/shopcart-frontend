import React from "react";
import { ArrowRight } from "lucide-react";

import Button from "../../../../../components/UI/Button";

const BrandsHeader = () => {
  return (
    <div className="mb-9 flex flex-col items-center px-3 text-center sm:mb-12">
      {/* Eyebrow */}
      <div className="mb-4 flex items-center justify-center gap-2.5 sm:mb-5 sm:gap-3">
        <span className="h-px w-7 bg-gradient-to-r from-transparent to-primary sm:w-10 md:w-12" />

        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary sm:text-[10px] sm:tracking-[0.2em] md:text-[11px] md:tracking-[0.22em]">
          Explore & Discover
        </span>

        <span className="h-px w-7 bg-gradient-to-l from-transparent to-primary sm:w-10 md:w-12" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-text-primary min-[400px]:text-[28px] sm:text-3xl md:text-4xl lg:text-[44px]">
        Shop By{" "}
        <span className="bg-gradient-to-r from-primary via-primary-active to-primary bg-clip-text text-transparent">
          Brands
        </span>
      </h2>

      {/* Description */}
      <p className="mt-2 max-w-[90%] text-[11px] leading-5 text-text-secondary min-[400px]:text-xs sm:mt-3 sm:text-sm sm:leading-6 md:text-base md:leading-7">
        Discover products from your favorite trusted brands
      </p>

      {/* Explore Button */}
      <Button
        variant="outlined"
        endIcon={
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        }
        className="group sm:!h-9 !h-10 !mt-5 !shadow"
      >
        Explore All Brands
      </Button>
    </div>
  );
};

export default React.memo(BrandsHeader);
