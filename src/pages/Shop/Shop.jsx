import React, { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ShopFilters from "./Components/ShopFilters";

const ShopPage = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <section className="section-container">
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[270px_minmax(0,1fr)]">
        {/* Desktop Filters */}
        <aside className="hidden lg:block">
          <ShopFilters />
        </aside>

        {/* Products Section */}
        <main className="min-w-0">
          {/* Mobile Filter Button */}
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-main px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-primary hover:text-primary"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          {/* Keep Your Existing Products Section Here */}
          {/* Products Header + Toolbar + Product Grid + Pagination */}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            aria-label="Close filters"
            onClick={() => setShowMobileFilters(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          />

          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-[360px] flex-col bg-bg-main shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-base font-bold text-text-primary">Filters</h2>

              <button
                onClick={() => setShowMobileFilters(false)}
                aria-label="Close filters"
                className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary"
              >
                <X size={19} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              <ShopFilters />
            </div>

            <div className="border-t border-border p-4">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default React.memo(ShopPage);
