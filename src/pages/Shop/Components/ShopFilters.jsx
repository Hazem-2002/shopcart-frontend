import React, { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border py-4 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-sm font-semibold text-text-primary"
      >
        {title}

        <ChevronDown
          size={16}
          className={`text-text-secondary transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

const FilterOption = ({ label, count, defaultChecked = false }) => (
  <label className="group flex cursor-pointer items-center justify-between gap-2 py-1.5">
    <span className="flex min-w-0 items-center gap-2.5">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="size-4 shrink-0 cursor-pointer accent-primary"
      />

      <span className="truncate text-[13px] text-text-secondary transition-colors group-hover:text-primary">
        {label}
      </span>
    </span>

    {count !== undefined && (
      <span className="text-[11px] text-text-secondary/70">{count}</span>
    )}
  </label>
);

const ShopFilters = () => {
  const colors = [
    { name: "Black", color: "#171717" },
    { name: "White", color: "#ffffff" },
    { name: "Gray", color: "#9ca3af" },
    { name: "Blue", color: "#2563eb" },
    { name: "Red", color: "#dc2626" },
    { name: "Green", color: "#16a34a" },
  ];

  return (
    <div className="rounded-xl border border-border bg-bg-main p-4 sm:p-5">
      {/* Filter Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={17} className="text-primary" />

          <h2 className="text-sm font-bold text-text-primary">Filters</h2>
        </div>

        <button
          type="button"
          className="text-xs font-medium text-primary transition-colors hover:text-primary-hover"
        >
          Clear All
        </button>
      </div>

      {/* Active Filters */}
      <div className="mb-2 flex flex-wrap gap-1.5">
        <span className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
          Electronics
        </span>

        <span className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
          In Stock
        </span>
      </div>

      {/* Categories */}
      <FilterSection title="Categories">
        <div className="flex flex-col">
          <FilterOption label="Electronics" count="120" defaultChecked />
          <FilterOption label="Fashion" count="85" />
          <FilterOption label="Home & Living" count="64" />
          <FilterOption label="Beauty" count="42" />
          <FilterOption label="Sports" count="38" />
          <FilterOption label="Accessories" count="56" />
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price Range">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            className="h-10 w-full min-w-0 rounded-lg border border-border bg-bg-secondary px-2.5 text-xs text-text-primary outline-none transition-all placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/10"
          />

          <span className="text-text-secondary">-</span>

          <input
            type="number"
            placeholder="Max"
            className="h-10 w-full min-w-0 rounded-lg border border-border bg-bg-secondary px-2.5 text-xs text-text-primary outline-none transition-all placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        <div className="mt-4 px-1">
          <input
            type="range"
            min="0"
            max="1000"
            defaultValue="500"
            className="h-1.5 w-full cursor-pointer accent-primary"
          />
          <div className="mt-2 flex justify-between text-[11px] text-text-secondary">
            <span>$0</span>
            <span>$1,000</span>
          </div>
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brands" defaultOpen={false}>
        <div className="mb-2">
          <input
            type="search"
            placeholder="Search brands..."
            className="h-9 w-full rounded-lg border border-border bg-bg-secondary px-3 text-xs text-text-primary outline-none transition-all placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        <FilterOption label="Apple" count="24" />
        <FilterOption label="Samsung" count="18" />
        <FilterOption label="Sony" count="15" />
        <FilterOption label="Xiaomi" count="12" />
        <FilterOption label="Anker" count="9" />
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Colors" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {colors.map((item) => (
            <label
              key={item.name}
              title={item.name}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-[11px] text-text-secondary transition-colors hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary"
            >
              <input type="checkbox" className="sr-only" />

              <span
                className="size-3 rounded-full border border-black/10"
                style={{ backgroundColor: item.color }}
              />

              {item.name}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Customer Rating" defaultOpen={false}>
        {[5, 4, 3, 2, 1].map((rating) => (
          <label
            key={rating}
            className="flex cursor-pointer items-center gap-2 py-1.5"
          >
            <input type="checkbox" className="size-4 accent-primary" />

            <span className="flex items-center gap-1 text-xs text-text-secondary">
              <span className="text-amber-400">{"★".repeat(rating)}</span>
              <span className="text-text-secondary">& Up</span>
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <FilterOption label="In Stock" count="320" />
        <FilterOption label="Out of Stock" count="12" />
      </FilterSection>
    </div>
  );
};

export default React.memo(ShopFilters);
