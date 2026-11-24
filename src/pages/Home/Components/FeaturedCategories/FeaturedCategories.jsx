import React, { useState } from "react";
import { useSelector } from "react-redux";

// Components
import FeaturedCategoriesHeader from "./Components/FeaturedCategoriesHeader";
import NavigationControls from "./Components/Navigation Controls";
import CategoriesSlider from "./Components/CategoriesSlider";
import CategoriesSkeletonSlider from "./Components/CategoriesSkeletonSlider";
import EmptyState from "./Components/EmptyState";

const CategoriesSection = () => {
  const [swiper, setSwiper] = useState(null);
  const { categories, isLoading } = useSelector((store) => store.categories);

  const [swiperState, setSwiperState] = useState({
    currentSlide: 1,
    totalSlides: 1,
    isBeginning: true,
    isEnd: false,
  });

  return (
    <section className="section-container flex flex-col gap-7 text-text-primary">
      {/* Header */}
      <FeaturedCategoriesHeader />

      {/* Categories Content */}
      {categories?.length > 0 || isLoading ? (
        <div className="space-y-4 overflow-hidden rounded-xl border border-border/70 bg-bg-surface/60 p-3 shadow min-[480px]:space-y-4 min-[480px]:p-4 sm:space-y-5 sm:rounded-2xl sm:p-5 lg:p-6">
          <NavigationControls swiper={swiper} swiperState={swiperState} />

          {!isLoading ? (
            <CategoriesSlider
              swiper={swiper}
              swiperState={swiperState}
              setSwiper={setSwiper}
              setSwiperState={setSwiperState}
            />
          ) : (
            <CategoriesSkeletonSlider />
          )}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
};

export default React.memo(CategoriesSection);
