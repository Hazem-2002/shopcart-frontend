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
    <section className="w-[98%] md:container mx-auto flex flex-col gap-10 px-4 py-14 md:py-16 text-text-primary">
      {/* Header */}
      <div className="mx-auto px-2 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Our Collection
          </span>

          <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
        </div>

        {/* Heading */}
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
          Featured{" "}
          <span className="bg-gradient-to-r from-primary to-primary-active bg-clip-text text-transparent">
            Products
          </span>
        </h2>

        {/* Description */}
        <p className="text-sm leading-7 text-text-secondary md:text-base">
          Discover our carefully curated selection of premium products,
          handpicked to bring you the best quality and value.
        </p>

        {/* Decorative Line */}
        <div className="mt-7 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary-active" />
      </div>

      {/* Filter */}
      <div className="flex flex-col p-6 border border-border rounded-lg shadow bg-bg-card">
        <div className="flex flex-col gap-6">
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
                    className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold capitalize transition duration-200 ${
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
                  className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold capitalize transition duration-200 ${
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
              className="md:ml-auto shrink-0 rounded-full border border-primary px-3 py-1 sm:px-4 text-xs sm:text-sm font-semibold capitalize text-primary transition hover:border-primary-active hover:bg-primary-light hover:text-primary"
            >
              See All
            </Link>
          </div>
          <hr className="border-0 border-t border-border" />
          {/* View Options */}
          <div className="flex flex-col md:flex-row md:justify-between gap-4 md:items-center">
            <div className="flex items-center gap-2 sm:gap-4">
              <h3 className="text-xs sm:text-sm font-semibold capitalize text-text-primary">
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
                  { value: "3", icon: Grid3X3, className: "!hidden md:!flex" },
                  { value: "2", icon: Grid2X2, className: "!hidden sm:!flex" },
                  { value: "list", icon: List, className: "!flex" },
                ].map(({ value, icon: Icon, className }) => (
                  <Button
                    key={value}
                    onClick={() => setGridView(value)}
                    variant="custom"
                    className={`!min-w-0 !size-8 !shrink-0 !items-center !justify-center !rounded-md !border !transition sm:!size-9 ${className} ${
                      gridView === value
                        ? "!border-primary !bg-primary !text-white"
                        : "!border-border !bg-surface !text-text-secondary hover:!border-primary hover:!text-primary"
                    }`}
                    aria-label={`View ${value === "list" ? "list" : `${value} columns`}`}
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
                    !min-w-0 !h-8 sm:!h-9
                    !shrink-0 !items-center !justify-center
                    !rounded-md !border !px-2 sm:!px-3
                    !text-xs
                    [&_.MuiButton-startIcon]:!mr-1.5
                    ${
                      openFilter
                        ? "!border-primary !bg-primary !text-white"
                        : "!border-border !bg-surface !text-secondary hover:!border-primary hover:!text-primary"
                    }
                  `}
                >
                  <span className="font-bold">Filters</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center max-md:w-full">
              <div className="flex items-center gap-3 max-md:grow">
                <ArrowUpNarrowWide size={20} strokeWidth={1.8} />

                <Select
                  name="sort"
                  value={filters.sort}
                  onChange={(event) => handleSortChange(event.target.value)}
                  options={sortOptions}
                  className="max-md:!w-full !h-9"
                />
              </div>
              <div className="flex items-center max-sm:justify-end gap-2.5">
                <Eye
                  size={20}
                  strokeWidth={1.5}
                  className="cursor-pointer transition-colors duration-200 hover:text-primary"
                />

                <span className="rounded-full bg-primary-light px-2.5 py-1.5 text-xs font-semibold capitalize text-primary">
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
