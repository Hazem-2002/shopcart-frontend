import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MoveUpRight } from "lucide-react";

const CategoryCard = ({ category }) => {
  const { name, slug, image } = category;

  return (
    <Link
      to={`/categories/${slug}`}
      className="group relative isolate block h-full overflow-hidden rounded-xl border border-border bg-bg-surface shadow transition-all duration-500 hover:-translate-y-1 hover:shadow-md hover:shadow-black/10 sm:rounded-2xl lg:rounded-3xl"
    >
      {/* Image */}
      <div className="relative h-[160px] overflow-hidden bg-bg-surface min-[480px]:h-[180px] sm:h-[200px] md:h-[210px] lg:h-[230px] xl:h-[240px]">
        <img
          src={image?.image_url}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/5 transition-all duration-500 group-hover:from-black/85 group-hover:via-black/20" />

        {/* Top Content */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-2.5 min-[480px]:p-3 sm:p-3.5 lg:p-4">
          {/* Label */}
          <span className="inline-flex items-center rounded-full border border-white/20 bg-black/20 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md min-[480px]:px-2.5 min-[480px]:text-[9px] sm:px-3 sm:py-1.5 sm:text-[10px]">
            Explore Collection
          </span>

          {/* Arrow */}
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary min-[480px]:h-8 min-[480px]:w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10">
            <ArrowUpRight
              size={14}
              strokeWidth={1.8}
              className="min-[480px]:size-4 lg:size-[17px]"
            />
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute inset-x-0 bottom-0 p-3 min-[480px]:p-3.5 sm:p-4 md:p-5 lg:p-6">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              {/* Eyebrow */}
              <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/65 min-[480px]:text-[9px] sm:mb-1.5 sm:text-[10px]">
                Discover More
              </p>

              {/* Category Name */}
              <h3 className="truncate text-base font-bold tracking-tight text-white min-[480px]:text-lg sm:text-xl lg:text-2xl">
                {name}
              </h3>

              {/* Shop Link */}
              <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-white/80 transition-colors duration-300 group-hover:text-white min-[480px]:text-[11px] sm:mt-2.5 sm:gap-1.5 sm:text-xs">
                <span>Shop Now</span>

                <MoveUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:size-[14px]"
                />
              </div>
            </div>

            {/* Decorative Accent */}
            <div className="mb-1 h-1 w-6 shrink-0 rounded-full bg-primary transition-all duration-500 group-hover:w-9 min-[480px]:w-8 min-[480px]:group-hover:w-10 sm:w-10 sm:group-hover:w-12 lg:group-hover:w-14" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(CategoryCard);
