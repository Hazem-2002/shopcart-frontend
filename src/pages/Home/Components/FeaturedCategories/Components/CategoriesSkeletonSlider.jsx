import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import CategoryCardSkeleton from "../../../../../components/UI/CategoryCard/CategoryCardSkeleton";

const CategoriesSkeletonSlider = () => {
  return (
    <div className="overflow-hidden py-4">
      <Swiper
        slidesPerView={1.3}
        spaceBetween={14}
        breakpoints={{
          480: {
            slidesPerView: 1.8,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2.4,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 22,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="!overflow-visible"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <CategoryCardSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(CategoriesSkeletonSlider);
