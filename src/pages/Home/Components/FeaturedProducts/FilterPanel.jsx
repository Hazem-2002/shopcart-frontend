import React, { useState } from "react";
import { useSelector } from "react-redux";

// components
import { Collapse } from "@mui/material";
import Input from "../../../../components/Input";
import PriceRangeSlider from "../../../../components/Slider";
import NumericStepper from "../../../../components/NumericStepper";
import Select from "../../../../components/Select";
import Button from "../../../../components/Button";

import { RotateCcw, SlidersHorizontal } from "lucide-react";

const FilterPanel = ({ open, filters, setFilters, applyFiltersHandler }) => {
  const { priceRange } = useSelector((store) => store.products);
  const [loading, setLoading] = useState(false);

  const ResetFiltersHandler = () => {
    if (
      filters.search !== "" ||
      filters.featured !== "all" ||
      filters.stock !== "all" ||
      filters.sort !== "-createdAt"
    ) {
      const Filters = {
        search: "",
        priceRange: filters.priceRange,
        featured: "all",
        stock: "all",
        sort: "-createdAt",
      };

      setFilters(Filters);
      applyFiltersHandler(Filters);
    }
  };

  return (
    <Collapse in={open}>
      <form className="mt-5 sm:mt-6 px-3 py-5 sm:p-5 border border-border rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-8 gap-y-5 sm:gap-y-6 items-start">
          {/* Search */}
          <div className="min-w-0">
            <Input
              type="search"
              search
              placeholder="Search products..."
              iconSize={16}
              label="Search Products"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>

          {/* Price Filter */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-text-primary">
                Price Range
              </label>
              <span className="text-xs text-text-muted">EGP</span>
            </div>

            <div className="grid md:grid-cols-2 gap-2 sm:gap-3">
              <NumericStepper
                id="min-price"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: [
                      Math.min(Number(e.target.value), filters.priceRange[1]),
                      filters.priceRange[1],
                    ],
                  })
                }
                max={filters.priceRange[1]}
                min={0}
                step={100}
                startAdornment={
                  <span className="text-secondary uppercase text-[10px] sm:text-xs font-bold">
                    Min
                  </span>
                }
              />

              <NumericStepper
                id="max-price"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: [
                      filters.priceRange[0],
                      Math.max(Number(e.target.value), filters.priceRange[0]),
                    ],
                  })
                }
                min={filters.priceRange[0]}
                max={Math.ceil(priceRange[1])}
                step={100}
                startAdornment={
                  <span className="text-secondary uppercase text-[10px] sm:text-xs font-bold">
                    Max
                  </span>
                }
              />
            </div>

            <div className="px-2 mt-3">
              <PriceRangeSlider
                min={0}
                max={Math.ceil(priceRange[1])}
                step={100}
                value={filters.priceRange}
                onChange={(range) =>
                  setFilters({ ...filters, priceRange: range })
                }
              />
            </div>
          </div>

          {/* Featured */}
          <div className="min-w-0">
            <Select
              name="featured"
              label="Featured"
              value={filters.featured}
              fullWidth
              onChange={(e) =>
                setFilters({ ...filters, featured: e.target.value })
              }
              options={[
                { label: "All Products", value: "all" },
                { label: "Featured Only", value: "true" },
                { label: "Not Featured", value: "false" },
              ]}
            />
          </div>

          {/* Stock */}
          <div className="min-w-0">
            <Select
              name="stock"
              label="Stock Status"
              value={filters.stock}
              fullWidth
              onChange={(e) =>
                setFilters({ ...filters, stock: e.target.value })
              }
              options={[
                { label: "All Products", value: "all" },
                { label: "In Stock", value: "in-stock" },
                { label: "Out of Stock", value: "out-of-stock" },
              ]}
            />
          </div>
        </div>

        <hr className="border-0 border-t border-border my-5 sm:my-6" />

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3">
          <Button
            variant="outlined"
            startIcon={<RotateCcw />}
            className="!h-10 sm:!h-9 !text-xs max-sm:!w-full"
            onClick={ResetFiltersHandler}
          >
            Reset Filters
          </Button>

          <Button
            variant="contained"
            startIcon={<SlidersHorizontal />}
            className="!h-10 sm:!h-9 !text-xs max-sm:!w-full"
            loading={loading}
            onClick={async () => {
              setLoading(true);

              try {
                await applyFiltersHandler(filters);
              } catch (error) {
                console.error(error);
              } finally {
                setLoading(false);
              }
            }}
          >
            Apply Filters
          </Button>
        </div>
      </form>
    </Collapse>
  );
};

export default React.memo(FilterPanel);
