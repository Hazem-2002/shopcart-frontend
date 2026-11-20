import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";

import CategoryCard from "../../../../../components/UI/CategoryCard/CategoryCard";

const CategoriesSlider = ({
  swiper,
  swiperState,
  setSwiper,
  setSwiperState,
}) => {
  const { categories } = useSelector((store) => store.categories);

  const updateSwiperState = (swiper) => {
    setSwiperState({
      currentSlide: swiper.snapIndex,
      totalSlides: swiper.snapGrid.length,
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  };

  return (
    <div className="overflow-hidden">
      <Swiper
        modules={[Navigation, A11y]}
        onSwiper={(swiper) => {
          setSwiper(swiper);
          updateSwiperState(swiper);
        }}
        onSlideChange={updateSwiperState}
        onReachEnd={updateSwiperState}
        onProgress={updateSwiperState}
        slidesPerView={1.2}
        spaceBetween={12}
        speed={600}
        grabCursor
        watchOverflow
        breakpoints={{
          400: {
            slidesPerView: 1.5,
            spaceBetween: 14,
          },
          480: {
            slidesPerView: 1.8,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2.2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="!overflow-visible"
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id} className="!h-auto">
            <CategoryCard category={category} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slider Footer */}
      <div className="flex items-center gap-2.5 mt-4 sm:gap-4">
        {/* Progress Bar */}
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-border/60 sm:h-1.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-active shadow-[0_0_8px] shadow-primary/25 transition-all duration-500 ease-out"
            style={{
              width: `${
                ((swiperState.isEnd
                  ? swiperState.totalSlides
                  : swiperState.currentSlide + 1) /
                  swiperState.totalSlides) *
                100
              }%`,
            }}
          />
        </div>

        {/* Slide Counter */}
        <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border/70 bg-bg-surface px-2 py-1.5 shadow-sm min-[480px]:gap-2 min-[480px]:px-2.5 sm:rounded-xl sm:px-3 sm:py-2">
          <span className="text-xs font-bold tabular-nums tracking-tight text-primary min-[480px]:text-[13px] sm:text-sm">
            {String(
              !swiperState.isEnd
                ? swiper?.params.slidesPerView + swiperState.currentSlide >
                  categories.length
                  ? swiper?.params.slidesPerView + swiperState.currentSlide - 1
                  : swiper?.params.slidesPerView + swiperState.currentSlide
                : categories.length,
            ).padStart(2, "0")}
          </span>

          <span className="h-2.5 w-px bg-border sm:h-3" />

          <span className="text-[10px] font-semibold tabular-nums text-text-secondary min-[480px]:text-[11px] sm:text-xs">
            {String(categories.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategoriesSlider);
