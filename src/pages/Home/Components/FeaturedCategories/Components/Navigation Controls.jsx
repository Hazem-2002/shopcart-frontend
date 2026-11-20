import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import IconButton from "../../../../../components/UI/IconButton";

const NavigationControls = ({ swiper, swiperState }) => {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
      <div className="min-w-0">
        <h3 className="text-xs font-bold tracking-tight text-text-primary min-[400px]:text-sm sm:text-base">
          Browse Collections
        </h3>

        <p className="mt-0.5 text-[10px] text-text-secondary min-[400px]:text-[11px] sm:text-xs">
          Find your perfect match
        </p>
      </div>

      {!(swiperState.isBeginning && swiperState.isEnd) && (
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <IconButton
            ariaLabel="Previous categories"
            onClick={() => swiper?.slidePrev()}
            disabled={swiperState.isBeginning}
            className="!h-8 !w-8 !rounded-lg !border !border-border !bg-bg-surface !text-text-secondary !shadow-sm !transition-all !duration-300 hover:!border-primary hover:!bg-primary hover:!text-white hover:!shadow-md hover:!shadow-primary/15 disabled:!cursor-not-allowed disabled:!opacity-35 disabled:hover:!border-border disabled:hover:!bg-bg-surface disabled:hover:!text-text-secondary disabled:hover:!shadow-none min-[400px]:!h-9 min-[400px]:!w-9 sm:!h-10 sm:!w-10 sm:!rounded-xl"
          >
            <ArrowLeft className="!size-3.5 min-[400px]:!size-[15px] sm:!size-[17px]" />
          </IconButton>

          <IconButton
            ariaLabel="Next categories"
            onClick={() => swiper?.slideNext()}
            disabled={swiperState.isEnd}
            className="!h-8 !w-8 !rounded-lg !border !border-border !bg-bg-surface !text-text-secondary !shadow-sm !transition-all !duration-300 hover:!border-primary hover:!bg-primary hover:!text-white hover:!shadow-md hover:!shadow-primary/15 disabled:!cursor-not-allowed disabled:!opacity-35 disabled:hover:!border-border disabled:hover:!bg-bg-surface disabled:hover:!text-text-secondary disabled:hover:!shadow-none min-[400px]:!h-9 min-[400px]:!w-9 sm:!h-10 sm:!w-10 sm:!rounded-xl"
          >
            <ArrowRight className="!size-3.5 min-[400px]:!size-[15px] sm:!size-[17px]" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default React.memo(NavigationControls);
