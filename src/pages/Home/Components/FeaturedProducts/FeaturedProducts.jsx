import React from "react";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Thunks
import { fetchSubcategories } from "../../../../features/subcategories/thunks/fetchSubcategories";
import { fetchProducts } from "../../../../features/products/thunks/fetchProducts";
import { fetchProductsPriceRange } from "../../../../features/products/thunks/fetchProductsPriceRange";

// Components
import Select from "../../../../components/UI/Select";
import ProductCard from "../../../../components/UI/ProductCard/productCard";
import ProductCardSkeleton from "../../../../components/UI/ProductCard/ProductCardSkeleton";
import Button from "../../../../components/UI/Button";
import FilterPanel from "./FilterPanel";

// Framer Motion
import { motion } from "framer-motion";

// Icons
import {
  LayoutGrid,
  Grid2X2,
  Grid3X3,
  PanelsTopLeft,
  List,
  ArrowUpNarrowWide,
  Eye,
  Funnel,
} from "lucide-react";
import { ShoppingBag } from "lucide-react";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const { subcategories, isLoading: subcategoriesLoading } = useSelector(
    (store) => store.subcategories,
  );
  const {
    products,
    count,
    priceRange,
    isLoading: productsLoading,
  } = useSelector((store) => store.products);

  // Set the limit for the number of products to fetch
  const limit = 10;

  // Set the limit for the number of subcategories to fetch based on the window width
  const subcategoryLimit =
    window.innerWidth < 350
      ? 3
      : window.innerWidth < 768
        ? 4
        : window.innerWidth < 1024
          ? 5
          : 6;

  // Determine the default grid view based on the window width
  const getDefaultGridView = () => {
    const width = window.innerWidth;

    if (width >= 1280) return "5";
    if (width >= 1024) return "4";
    if (width >= 768) return "3";
    if (width >= 640) return "2";

    return "list";
  };

  const [gridView, setGridView] = useState(getDefaultGridView);
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    sort: "-createdAt",
    priceRange: priceRange,
    featured: "all",
    stock: "all",
  });

  const getSubcategoryFilters = useMemo(() => {
    if (selectedSubcategory === "others") {
      return {
        "subcategories[nin]": subcategories.map(({ _id }) => _id),
      };
    }

    return { subcategories: selectedSubcategory };
  }, [selectedSubcategory, subcategories]);

  // Apply selected filters
  const applyFiltersHandler = useCallback(
    (updatedFilters = filters) => {
      return dispatch(
        fetchProducts({
          ...getSubcategoryFilters,
          search: updatedFilters.search,
          "priceAfterDiscount[gte]": updatedFilters.priceRange[0],
          "priceAfterDiscount[lte]": updatedFilters.priceRange[1],
          isFeatured:
            updatedFilters.featured === "all"
              ? undefined
              : updatedFilters.featured === "true",
          ...(updatedFilters.stock === "all"
            ? {}
            : updatedFilters.stock === "in-stock"
              ? { "quantity[gte]": 1 }
              : { "quantity[eq]": 0 }),
          limit,
          sort: updatedFilters.sort,
        }),
      );
    },
    [dispatch, filters, getSubcategoryFilters, limit],
  );

  // Fetch subcategories on component mount and when the window is resized
  useEffect(() => {
    const getSubcategories = () => {
      dispatch(
        fetchSubcategories({
          limit: subcategoryLimit,
          sort: "createdAt",
          fields: "name",
        }),
      );
    };

    getSubcategories();
  }, [dispatch, subcategoryLimit]);

  // Set the first subcategory as selected if none is selected
  useEffect(() => {
    if (subcategories?.length > 0 && !selectedSubcategory) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedSubcategory(subcategories[0]._id);
    }
  }, [subcategories, selectedSubcategory]);

  // Fetch products and price range when the selected subcategory changes
  useEffect(() => {
    if (!selectedSubcategory) return;

    applyFiltersHandler({ ...filters, priceRange: [null, null] });

    dispatch(fetchProductsPriceRange(getSubcategoryFilters));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedSubcategory]);

  // Update filters when the price range changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange,
    }));
  }, [dispatch, priceRange]);

  const sortOptions = [
    { value: "-createdAt", label: "Newest" },
    { value: "createdAt", label: "Oldest" },
    { value: "price", label: "Price: Low to High" },
    { value: "-price", label: "Price: High to Low" },
    { value: "name", label: "Name (A-Z)" },
    { value: "-name", label: "Name (Z-A)" },
  ];

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.075,
        ease: "easeOut",
      },
    }),
  };

  const handleSortChange = (sortValue) => {
    const updatedFilters = {
      ...filters,
      sort: sortValue,
    };

    setFilters(updatedFilters);
    applyFiltersHandler(updatedFilters);
  };

  return (
    <section className="section-container flex flex-col gap-7 text-text-primary">
      {/* Header */}
      <div className="mx-auto flex flex-col items-center px-3 text-center">
        {/* Eyebrow */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 sm:mb-5 sm:gap-2.5 sm:px-3.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>

          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-primary sm:text-[10px] sm:tracking-[0.18em] md:text-[11px] md:tracking-[0.2em]">
            Our Collection
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-text-primary min-[400px]:text-[28px] sm:text-3xl md:text-4xl lg:text-[44px]">
          Featured{" "}
          <span className="bg-gradient-to-r from-primary via-primary-active to-primary bg-clip-text text-transparent">
            Products
          </span>
        </h2>

        {/* Description */}
        <p className="mt- text-[11px] leading-5 text-text-secondary min-[400px]:text-xs sm:mt-3 sm:text-sm sm:leading-6 md:text-base md:leading-7">
          Discover our carefully curated selection of premium products,
          handpicked to bring you the best quality and value.
        </p>

        {/* Decorative Accent */}
        <div className="mt-5 flex items-center gap-1.5 sm:mt-6">
          <span className="h-1 w-5 rounded-full bg-primary/20 sm:w-6" />
          <span className="h-1 w-8 rounded-full bg-primary sm:w-10" />
          <span className="h-1 w-5 rounded-full bg-primary/20 sm:w-6" />
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-col rounded-lg border border-border bg-bg-card p-4 shadow sm:p-5 md:p-6">
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Subcategory Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {subcategoriesLoading ? (
              Array.from({ length: subcategoryLimit }).map((_, index) => (
                <div
                  key={`skeleton-subcategory-${index}`}
                  className="h-8 w-25 animate-pulse rounded-full bg-bg-hover"
                />
              ))
            ) : (
              <>
                {subcategories.map((subcategory) => (
                  <button
                    key={subcategory._id}
                    onClick={() => setSelectedSubcategory(subcategory._id)}
                    className={`cursor-pointer rounded-full border px-3 py-1.5 text-[11px] font-semibold capitalize transition duration-200 min-[400px]:px-4 min-[400px]:py-2 min-[400px]:text-xs ${
                      selectedSubcategory === subcategory._id
                        ? "border-primary bg-primary text-white shadow-sm"
                        : "border-border bg-surface text-text-secondary hover:border-primary hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {subcategory.name}
                  </button>
                ))}

                <button
                  onClick={() => setSelectedSubcategory("others")}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 text-[11px] font-semibold capitalize transition duration-200 min-[400px]:px-4 min-[400px]:py-2 min-[400px]:text-xs ${
                    selectedSubcategory === "others"
                      ? "border-primary bg-primary text-white shadow-sm"
                      : "border-border bg-surface text-text-secondary hover:border-primary hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  Others
                </button>
              </>
            )}

            <Link
              to="/shop"
              className="shrink-0 rounded-full border border-primary px-3 py-1.5 leading-none text-[11px] font-semibold capitalize text-primary transition hover:border-primary-active hover:bg-primary-light hover:text-primary min-[400px]:px-4 min-[400px]:py-2 min-[400px]:text-xs md:ml-auto"
            >
              See All
            </Link>
          </div>

          <hr className="border-0 border-t border-border" />

          {/* View Options */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <h3 className="text-[11px] font-semibold capitalize text-text-primary min-[400px]:text-xs sm:text-sm">
                View:
              </h3>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {[
                  {
                    value: "5",
                    icon: LayoutGrid,
                    className: "!hidden xl:!flex",
                  },
                  {
                    value: "4",
                    icon: PanelsTopLeft,
                    className: "!hidden lg:!flex",
                  },
                  {
                    value: "3",
                    icon: Grid3X3,
                    className: "!hidden md:!flex",
                  },
                  {
                    value: "2",
                    icon: Grid2X2,
                    className: "!hidden sm:!flex",
                  },
                  {
                    value: "list",
                    icon: List,
                    className: "!flex",
                  },
                ].map(({ value, icon: Icon, className }) => (
                  <Button
                    key={value}
                    onClick={() => setGridView(value)}
                    variant="custom"
                    className={`!min-w-0 !size-8 !shrink-0 !items-center !justify-center !leading-none !rounded-md !border !transition sm:!size-9 ${className} ${
                      gridView === value
                        ? "!border-primary !bg-primary !text-white"
                        : "!border-border !bg-surface !text-text-secondary hover:!border-primary hover:!text-primary"
                    }`}
                    aria-label={`View ${
                      value === "list" ? "list" : `${value} columns`
                    }`}
                    aria-pressed={gridView === value}
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.8}
                      className="!block !shrink-0"
                    />
                  </Button>
                ))}

                <Button
                  variant="custom"
                  onClick={() => setOpenFilter((prev) => !prev)}
                  aria-label="Toggle filters"
                  aria-expanded={openFilter}
                  startIcon={<Funnel strokeWidth={1.8} className="!shrink-0" />}
                  iconSize={15}
                  className={`
                    !min-w-0 !h-8 sm:!h-9 leading-none
                    !shrink-0 flex !items-center !justify-center
                    !rounded-md !border !px-2 sm:!px-3
                    !text-[11px] sm:!text-xs
                    [&_.MuiButton-startIcon]:!mr-1.5
                    ${
                      openFilter
                        ? "!border-primary !bg-primary !text-white"
                        : "!border-border !bg-surface !text-secondary hover:!border-primary hover:!text-primary"
                    }
                  `}
                >
                  <span className="font-bold leading-none">Filters</span>
                </Button>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:w-auto">
              <div className="flex items-center gap-3 max-sm:grow">
                <ArrowUpNarrowWide
                  size={20}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                <Select
                  name="sort"
                  value={filters.sort}
                  onChange={(event) => handleSortChange(event.target.value)}
                  options={sortOptions}
                  className="!h-9 max-md:!w-full"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5">
                <Eye
                  size={20}
                  strokeWidth={1.5}
                  className="cursor-pointer transition-colors duration-200 hover:text-primary"
                />

                <span className="rounded-full bg-primary-light px-2.5 py-1.5 text-[11px] font-semibold capitalize text-primary min-[400px]:text-xs">
                  {count} products
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          open={openFilter}
          filters={filters}
          setFilters={setFilters}
          applyFiltersHandler={applyFiltersHandler}
        />
      </div>

      {/* Products */}
      <div
        className="!grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${gridView === "list" ? 1 : gridView}, minmax(0, 1fr))`,
        }}
      >
        {productsLoading || subcategoriesLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={`skeleton-${index}`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <ProductCardSkeleton />
            </motion.div>
          ))
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <motion.div
              key={product._id + gridView}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center px-4 py-12 text-center sm:py-16 md:py-20">
            {/* Icon */}
            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/5 sm:size-20 sm:rounded-3xl">
              <ShoppingBag
                size={32}
                strokeWidth={1.5}
                className="text-primary sm:size-10"
              />
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold tracking-tight text-primary sm:text-xl md:text-2xl">
              No Products Available
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-secondary sm:text-sm sm:leading-6">
              There are no products to display at the moment. Please check back
              soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(FeaturedProducts);
