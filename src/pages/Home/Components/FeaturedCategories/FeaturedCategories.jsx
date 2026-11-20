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
    <section className="mx-auto flex w-[98%] flex-col gap-7 overflow-hidden p-4 text-text-primary md:container min-w-[90%]">
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
