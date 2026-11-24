import React from "react";

import {
  Truck,
  ShieldCheck,
  Headset,
  BadgeCheck,
  ArrowUpRight,
  CreditCard,
  RefreshCcw,
  ShoppingBag,
  PackageCheck,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description:
      "Get your favorite products delivered right to your doorstep with a smooth shopping experience.",
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "Shop with confidence through a secure shopping experience that keeps your information protected.",
  },
  {
    id: 3,
    icon: Headset,
    title: "Dedicated Support",
    description:
      "Our support team is here to help you whenever you need assistance with your orders.",
  },
  {
    id: 4,
    icon: BadgeCheck,
    title: "Quality Products",
    description:
      "Discover carefully selected products that bring you great value and a better shopping experience.",
  },
  {
    id: 5,
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Enjoy a safe payment experience with secure online payment processing.",
  },
  {
    id: 6,
    icon: RefreshCcw,
    title: "Easy Returns",
    description:
      "A simple return experience designed to make shopping more convenient.",
  },
  {
    id: 7,
    icon: ShoppingBag,
    title: "Easy Checkout",
    description:
      "Complete your orders effortlessly with a smooth and straightforward checkout process.",
  },
  {
    id: 8,
    icon: PackageCheck,
    title: "Order Tracking",
    description:
      "Stay updated and keep track of your orders from purchase to delivery.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-container">
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-bg-surface/60 px-4 py-6 sm:rounded-3xl sm:px-8 sm:py-10 lg:px-10 lg:py-12 shadow">
        {/* Section Header */}
        <div className="relative mx-auto mb-8 text-center sm:mb-10 lg:mb-12">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary sm:text-xs">
            The Shop Cart Difference
          </p>

          {/* Heading */}
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
            Why Shop{" "}
            <span className="bg-gradient-to-r from-primary via-primary-active to-primary bg-clip-text text-transparent">
              With Us?
            </span>
          </h2>

          <p className="mx-auto mt-3 text-xs leading-6 text-text-secondary sm:text-sm">
            We make online shopping easier, safer, and more enjoyable with
            everything you need in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="relative grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 min-[480px]:gap-4 lg:grid-cols-4 lg:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group relative flex flex-col justify-between rounded-xl cursor-pointer border border-border/70 bg-bg-surface/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-sm min-[480px]:p-5 sm:rounded-2xl lg:p-6"
              >
                {/* Icon */}
                <div className="mb-3.5 flex size-9 items-center justify-center rounded-full border border-primary/15 bg-primary/5 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white min-[480px]:mb-4 min-[480px]:size-10 min-[480px]:rounded-xl sm:mb-5 sm:size-11">
                  <Icon
                    size={19}
                    strokeWidth={1.7}
                    className="min-[480px]:size-4.5 sm:size-5.5"
                  />
                </div>

                {/* Number */}
                <span className="absolute right-4 top-4 text-[10px] font-bold tabular-nums text-text-secondary/40 sm:right-5 sm:top-5">
                  {(index + 1).toString().padStart(2, 0)}
                </span>

                {/* Content */}
                <h3 className="text-sm font-bold tracking-tight text-text-primary sm:text-base">
                  {feature.title}
                </h3>

                <p className="mt-2 text-[11px] leading-5 text-text-secondary sm:text-xs sm:leading-6">
                  {feature.description}
                </p>

                {/* Bottom Accent */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="h-1 w-7 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-12 group-hover:bg-primary" />

                  <ArrowUpRight
                    size={16}
                    className="text-text-secondary/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhyChooseUs);
