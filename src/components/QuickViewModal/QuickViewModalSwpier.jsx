import React from "react";
import { useState, useMemo } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const QuickViewModalSwpier = ({
  product,
  setMainSwiper,
  setSelectedColor,
  setSelectedSize,
  mainSwiper,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const hasVariants = useMemo(
    () => product?.variants?.length > 1,
    [product.variants],
  );

  const uniqueImages = useMemo(
    () => [
      ...new Map(
        (product.productImages || [])
          .filter((item) => item.image_url)
          .map((item) => {
            const variant =
              product.variants?.find(
                (variant) => variant.image?.image_url === item.image_url,
              ) || null;

            return [
              item.image_url,
              {
                image: item.image_url,
                variant,
              },
            ];
          }),
      ).values(),
    ],
    [product.productImages, product.variants],
  );

  const mainSlideChangeHandler = (swiper) => {
    if (!hasVariants) return;

    const currentVariant = uniqueImages[swiper.realIndex]?.variant;

    if (currentVariant && currentVariant.quantity <= 0) {
      const isMovingBackward = swiper.previousIndex > swiper.realIndex;

      let targetIndex;

      if (isMovingBackward) {
        targetIndex =
          swiper.realIndex === 0 ? swiper.realIndex + 1 : swiper.realIndex - 1;
      } else {
        targetIndex =
          swiper.realIndex === uniqueImages.length - 1
            ? swiper.realIndex - 1
            : swiper.realIndex + 1;
      }

      swiper.slideToLoop(targetIndex);
      return;
    }

    if (currentVariant) {
      setSelectedColor(currentVariant.color?.color || "");
      setSelectedSize(currentVariant.size || "");
    }
  };

  const thumbSlideClickHandler = (variant) => {
    if ((hasVariants && !variant) || variant.quantity <= 0) {
      mainSwiper.slideToLoop(mainSwiper.previousIndex);
      return;
    }
    setSelectedColor(variant.color?.color || "");
    setSelectedSize(variant.size || "");
  };

  return (
    <div className="grid grid-rows-[2fr_1fr] grid-cols-1 h-full max-h-[320px] sm:max-h-[380px] lg:h-[inherit] lg:max-h-[550px] gap-4 overflow-hidden lg:p-6 lg:pr-0 lg:pb-0">
      {/* Main Image */}
      <Swiper
        modules={[Navigation, Thumbs, Autoplay, EffectFade]}
        onSwiper={setMainSwiper}
        onSlideChange={mainSlideChangeHandler}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={500}
        navigation
        autoplay={
          !hasVariants
            ? {
                delay: 3000,
                disableOnInteraction: false,
              }
            : false
        }
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          autoScrollOffset: 1,
        }}
        slidesPerView={1}
        spaceBetween={0}
        loop={hasVariants ? false : true}
        className="!h-full !w-full rounded-2xl"
      >
        {uniqueImages.map(({ image, variant }, index) => (
          <SwiperSlide
            key={`${image}-${index}`}
            className="flex items-center justify-center"
          >
            <img
              src={image}
              alt={`${product.name} ${variant?.color?.color || ""}`}
              className="size-full bg-white object-contain py-4"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        watchSlidesProgress
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        className="!w-full !h-full !overflow-hidden"
      >
        {uniqueImages.map(({ image, variant }, index) => (
          <SwiperSlide
            key={`${image}-${index}`}
            onClick={() => thumbSlideClickHandler(variant)}
            style={{
              width: `calc((100% - ${15 * (3 - 1)}px) / ${3})`,
            }}
            className={`!relative !h-18 sm:!h-20 md:!h-22 lg:!h-25 shrink-0 ${variant?.quantity > 0 || !variant ? "cursor-pointer" : "cursor-not-allowed"}  overflow-hidden rounded-xl !border-2 border-border bg-white p-1 transition [&.swiper-slide-thumb-active]:!border-primary [&.swiper-slide-thumb-active_.overlay]:!hidden`}
          >
            <img
              src={image}
              alt={`${product.name} thumbnail ${index + 1}`}
              className="size-full object-contain py-1"
            />

            {/* Overlay */}
            <div className="overlay absolute inset-0 z-10 bg-black/10 dark:bg-black/60 transition duration-300" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(QuickViewModalSwpier);
