import React from "react";

const CategoryCardSkeleton = () => {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-border bg-bg-surface shadow sm:rounded-3xl">
      <div className="relative h-[190px] animate-pulse overflow-hidden bg-bg-surface sm:h-[220px] lg:h-[240px]">
        {/* Top Content */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-3 sm:p-4">
          {/* Label */}
          <div className="h-6 w-28 rounded-full bg-border/70 sm:w-32" />

          {/* Arrow */}
          <div className="h-8 w-8 shrink-0 rounded-full bg-border/70 sm:h-10 sm:w-10" />
        </div>

        {/* Bottom Content */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-5 lg:p-6">
          <div className="flex min-w-0 flex-col gap-3">
            {/* Eyebrow */}
            <div className="h-2 w-20 rounded bg-border/70" />

            {/* Category Name */}
            <div className="h-6 w-36 rounded-md bg-border/70 sm:h-7 sm:w-44" />

            {/* Shop Link */}
            <div className="mt-1 h-3 w-16 rounded bg-border/70" />
          </div>

          {/* Decorative Accent */}
          <div className="mb-1 h-1 w-8 shrink-0 rounded-full bg-border/70 sm:w-10" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategoryCardSkeleton);
