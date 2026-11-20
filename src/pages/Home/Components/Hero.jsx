import React from "react";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { ArrowRight } from "lucide-react";

import Button from "../../../components/UI/Button";

const Hero = () => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 100,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight - 100,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliders = [
    {
      id: 1,
      image: `https://cdn.sanity.io/images/78643nhe/production/a7600ca1f64402868eac23fa66713adaac90752f-1080x450.png?w=${viewport.width}&h=${viewport.height}&fit=crop&crop=focalpoint&fp-x=0.8&fp-y=0`,
      eyebrow: "SUMMER COLLECTION 2026",
      title: "Refresh Your Style",
      description:
        "Discover your summer essentials with fresh styles, amazing deals, and everything you need to stand out this season.",
      offer: "Up to 70% OFF",
      buttonText: "Shop Summer Deals",
      buttonLink: "/shop",
    },
    {
      id: 2,
      image: `https://cdn.sanity.io/images/78643nhe/production/fd4728bee2fb71669653058ef1281403cdbe7573-1080x450.png?w=${viewport.width}&h=${viewport.height}&fit=crop&crop=focalpoint&fp-x=0.73&fp-y=0`,
      eyebrow: "TECHNOLOGY & INNOVATION",
      title: "Upgrade Your Everyday",
      description:
        "Explore the latest gadgets and smart technology designed to make your life easier, smarter, and more connected.",
      offer: "Deals Starting at $9.99",
      buttonText: "Explore Electronics",
      buttonLink: "/categories/electronics",
    },
    {
      id: 3,
      image: `https://cdn.sanity.io/images/78643nhe/production/de64d77cc797b1d10afd7cf454d615af6b5c62a3-1024x427.png?w=${viewport.width}&h=${viewport.height}&fit=crop&crop=focalpoint&fp-x=0.75&fp-y=0&q=85`,
      eyebrow: "JUST DROPPED",
      title: "Find Your Next Favorite",
      description:
        "Meet the latest arrivals across your favorite categories, handpicked to bring something new to your everyday.",
      offer: "Discover What's New",
      buttonText: "Shop New Arrivals",
      buttonLink: "/shop?sort=newest",
    },
  ];
  return (
    <section>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        speed={1000}
        loop={true}
        autoplay={true}
        navigation
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        allowTouchMove={true}
        grabCursor={false}
        className="group"
      >
        {sliders.map((slider) => (
          <SwiperSlide
            key={slider.id}
            className="!min-h-[calc(100vh-64px)] sm:!min-h-[calc(100vh-72px)]"
          >
            <div className="relative flex min-h-[inherit] w-full items-center overflow-hidden py-6 sm:py-8 md:py-10 isolate group">
              {/* Background Image */}
              <img
                src={slider.image}
                alt={slider.title}
                className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/7 via-primary/4 to-transparent dark:from-primary/18 dark:via-primary/7" />

              {/* Content */}
              <div className="mx-auto w-[92%] rounded-xl border border-white/20 bg-bg-main/35 p-4 text-white shadow-lg shadow-black/5 max-sm:backdrop-blur-sm min-[400px]:w-[90%] min-[400px]:rounded-2xl min-[400px]:p-5 sm:p-6 md:p-8 lg:p-10">
                {/* Eyebrow */}
                <div className="mb-3 flex items-center gap-2 min-[400px]:mb-4 min-[400px]:gap-3 sm:mb-5">
                  <span className="h-px w-7 bg-gradient-to-l from-secondary to-transparent min-[400px]:w-10" />

                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-secondary min-[400px]:text-[10px] min-[400px]:tracking-[0.2em] sm:text-xs sm:tracking-[0.25em] md:text-sm">
                    {slider.eyebrow}
                  </p>

                  <span className="h-px w-7 bg-gradient-to-r from-secondary to-transparent min-[400px]:w-10" />
                </div>

                {/* Heading */}
                <h2 className="mb-3 max-w-full bg-gradient-to-br from-primary/70 via-primary/35 to-primary bg-clip-text text-[28px] font-black leading-[1.1] tracking-[-0.04em] text-transparent min-[400px]:mb-4 min-[400px]:text-3xl sm:mb-5 sm:max-w-[60%] sm:text-5xl md:text-6xl lg:text-7xl dark:from-primary dark:via-primary/50">
                  {slider.title}
                </h2>

                {/* Description */}
                <p className="mb-4 max-w-full text-[11px] leading-5 text-secondary min-[400px]:mb-5 min-[400px]:text-xs min-[400px]:leading-6 sm:max-w-[60%] sm:text-sm sm:leading-7 md:text-base">
                  {slider.description}
                </p>

                {/* Offer */}
                <div className="mb-5 inline-flex items-center gap-2 min-[400px]:mb-6 min-[400px]:gap-3 sm:mb-7">
                  <span className="w-1 self-stretch rounded-full bg-gradient-to-b from-secondary/80 via-secondary/30 to-secondary/80" />

                  <span className="text-xl font-black text-secondary min-[400px]:text-2xl md:text-3xl">
                    {slider.offer}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2.5 min-[400px]:gap-3 sm:gap-4">
                  <Button className="!h-8 !px-3 !text-[10px] min-[400px]:!h-9 min-[400px]:!px-4 min-[400px]:!text-xs sm:!h-10 sm:!px-5 sm:!text-sm md:!h-11">
                    {slider.buttonText}
                  </Button>

                  <Button
                    variant="outlined"
                    endIcon={
                      <ArrowRight className="!size-3.5 min-[400px]:!size-4 sm:!size-[18px]" />
                    }
                    className="!h-8 !px-3 !text-[10px] min-[400px]:!h-9 min-[400px]:!px-4 min-[400px]:!text-xs sm:!h-10 sm:!px-5 sm:!text-sm md:!h-11"
                  >
                    Explore Collection
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default React.memo(Hero);
