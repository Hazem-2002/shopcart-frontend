import React from "react";

import { ShoppingBag } from "lucide-react";

const WelcomeSection = () => {
  return (
    <section className="relative overflow-hidden max-md:min-h-screen md:rounded-r-[10%] bg-gradient-to-br from-primary-dark via-primary to-primary md:block">
      {/* Background Shape */}
      <div className="absolute -left-[35%] -top-[35%] size-[115%] rounded-full bg-gradient-to-br from-primary-dark via-primary-hover to-primary/80" />

      {/* Decorative Circles */}
      <div className="absolute -bottom-[18%] -left-[24%] size-[53%] rounded-full bg-gradient-to-br from-accent via-primary to-primary-dark shadow-lg" />

      <div className="absolute -bottom-[5%] left-[38%] size-[43%] rounded-full bg-gradient-to-br from-accent via-primary to-primary-dark shadow-xl" />

      <div className="absolute -bottom-[28%] -right-[24%] size-[48%] rounded-full bg-gradient-to-br from-accent via-primary to-primary-dark" />

      {/* Overlay */}
      <div className="absolute inset-0 dark:bg-black/20"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col gap-5 justify-between px-8 py-12 xl:px-12">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 shadow-sm backdrop-blur-sm">
            <ShoppingBag size={16} strokeWidth={2} className="text-white" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-white/80 lg:text-xs">
            Welcome to Shop Cart
          </span>
        </div>

        <div className="grow flex flex-col justify-evenly">
          <h1 className="mb-3 text-2xl font-extrabold leading-[1.2] tracking-tight text-text-white lg:text-3xl xl:text-4xl">
            Shopping Made
            <span className="block text-text-white/65">
              Simple & Enjoyable.
            </span>
          </h1>

          <p className="text-xs leading-6 text-text-white/75 lg:text-sm lg:leading-7 xl:text-[14px]">
            Discover products you'll love, explore amazing deals, and enjoy a
            smarter shopping experience. Everything you need, all in one place.
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-5 grow justify-around">
          {[
            {
              number: "01",
              title: "Discover More",
              description: "Explore products across different categories.",
            },
            {
              number: "02",
              title: "Shop With Ease",
              description: "A smooth and effortless shopping experience.",
            },
            {
              number: "03",
              title: "Checkout Securely",
              description: "A simple and secure way to complete your orders.",
            },
          ].map((item) => (
            <div key={item.number} className="flex items-start gap-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-text-white/20 bg-text-white/10 text-[10px] font-bold text-text-white lg:text-xs">
                {item.number}
              </span>

              <div>
                <h3 className="text-xs font-bold text-text-white lg:text-sm">
                  {item.title}
                </h3>
                <p className="mt-1 text-[10px] leading-5 text-text-white/65 lg:text-xs">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="grow flex flex-col justify-end">
          <div className="h-px w-full bg-text-white/20" />
          <p className="mt-5 text-[10px] text-center font-semibold tracking-[0.15em] text-text-white/65 lg:text-xs lg:tracking-[0.18em]">
            YOUR STYLE. YOUR CHOICE. YOUR CART.
          </p>
        </div>
      </div>
    </section>
  );
};

export default React.memo(WelcomeSection);
