import React from "react";

const SkeletonItem = ({ className = "" }) => (
  <div className={`animate-pulse rounded-md bg-bg-hover ${className}`} />
);

const ProductCardSkeleton = () => {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg-card shadow-sm">
      {/* Product Images */}
      <div className="relative overflow-hidden bg-bg-card">
        {/* Product Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          <SkeletonItem className="h-6 w-12" />
          <SkeletonItem className="h-6 w-20" />
        </div>

        {/* Wishlist */}
        <SkeletonItem className="absolute right-3 top-3 z-10 size-9 rounded-full" />

        {/* Main Image */}
        <div className="flex h-64 w-full items-center justify-center border-b border-border bg-bg-surface p-6">
          <SkeletonItem className="size-full rounded-lg" />
        </div>

        {/* Pagination */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          <SkeletonItem className="size-1.5 rounded-full" />
          <SkeletonItem className="size-1.5 rounded-full" />
          <SkeletonItem className="size-1.5 rounded-full" />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Brand & SKU */}
        <div className="flex items-center justify-between gap-2">
          <SkeletonItem className="h-3 w-20" />
          <SkeletonItem className="h-2.5 w-12" />
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-2">
          <SkeletonItem className="h-4 w-full" />
          <SkeletonItem className="h-4 w-3/4" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <SkeletonItem className="h-4 w-24" />
          <SkeletonItem className="h-3 w-7" />
          <SkeletonItem className="h-3 w-8" />
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center gap-2">
          <SkeletonItem className="h-5 w-24" />
          <SkeletonItem className="h-3 w-16" />
        </div>

        {/* Stock */}
        <div className="flex items-center justify-between">
          <SkeletonItem className="h-3 w-20" />
          <SkeletonItem className="h-3 w-16" />
        </div>

        {/* Add To Cart */}
        <SkeletonItem className="mt-1 h-10 w-full rounded-lg" />
      </div>
    </article>
  );
};

export default React.memo(ProductCardSkeleton);
