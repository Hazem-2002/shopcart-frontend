import React from "react";

import { Layers3 } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-bg-surface/40 px-3 py-8 text-center transition-colors duration-300 min-[480px]:min-h-[220px] min-[480px]:px-4 sm:min-h-[240px] sm:rounded-2xl sm:py-10">
      {/* Icon */}
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/5 text-primary min-[480px]:mb-3.5 min-[480px]:h-[52px] min-[480px]:w-[52px] sm:mb-4 sm:h-14 sm:w-14 sm:rounded-2xl">
        <Layers3
          size={23}
          strokeWidth={1.6}
          className="min-[480px]:size-[25px] sm:size-[27px]"
        />
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold tracking-tight text-text-primary min-[480px]:text-[15px] sm:text-base">
        No Categories Available
      </h3>

      {/* Description */}
      <p className="mt-1.5 text-[11px] leading-5 text-text-secondary min-[480px]:mt-2 min-[480px]:text-xs sm:text-sm sm:leading-6">
        We're currently updating our collections. Check back soon to discover
        something you'll love.
      </p>
    </div>
  );
};

export default React.memo(EmptyState);
