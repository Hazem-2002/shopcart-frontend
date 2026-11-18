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
            <div className="relative py-10 group isolate flex items-center min-h-[inherit] w-full overflow-hidden">
              {/* Background Image */}
              <img
                src={slider.image}
                alt={slider.title}
                className="absolute inset-0 -z-20 size-full object-cover transition-transform will-change-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/7 via-primary/4 dark:from-primary/18 dark:via-primary/7 to-transparent" />

              {/* Content */}
              <div className="w-[90%] mx-auto rounded-2xl border border-white/20 bg-bg-main/35 p-6 text-white shadow-lg shadow-black/5 max-sm:backdrop-blur-sm">
                {/* Eyebrow */}
                <div className="mb-4.5 flex items-center gap-3">
                  <span className="h-px w-10 bg-gradient-to-l from-secondary to-transparent" />
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary md:text-sm">
                    {slider.eyebrow}
                  </p>
                  <span className="h-px w-10 bg-gradient-to-r from-secondary to-transparent" />
                </div>

                {/* Heading */}
                <h2 className="mb-5 sm:max-w-[60%] bg-gradient-to-br from-primary/70 via-primary/35 dark:from-primary dark:via-primary/50 to-primary bg-clip-text text-4xl font-black leading-[1.1] tracking-[-0.04em] text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                  {slider.title}
                </h2>

                {/* Description */}
                <p className="mb-5 sm:max-w-[60%] text-sm leading-7 text-secondary md:text-base">
                  {slider.description}
                </p>

                {/* Offer */}
                <div className="mb-7 inline-flex items-center gap-3">
                  <span className="w-1 self-stretch rounded-full bg-gradient-to-b from-secondary/80 via-secondary/30 to-secondary/80" />

                  <span className="text-2xl font-black text-secondary md:text-3xl">
                    {slider.offer}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  <Button className="max-xs:!text-[10px] max-sm:!text-xs max-sm:!h-8">
                    {slider.buttonText}
                  </Button>

                  <Button
                    variant="outlined"
                    endIcon={<ArrowRight />}
                    className="max-xs:!text-[10px] max-sm:!text-xs max-sm:!h-8"
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
