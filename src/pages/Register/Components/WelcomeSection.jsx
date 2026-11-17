import React from "react";
import { ShoppingBag, Tag, Gift, Heart } from "lucide-react";

const WelcomeSection = () => {
  return (
    <section className="relative flex max-lg:min-h-screen flex-col !order-1 md:!order-2 overflow-hidden bg-gradient-to-br from-primary-dark via-primary-hover to-primary md:rounded-l-[10%]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[20%] -top-[15%] size-[75%] rounded-full border border-white/[0.08]" />
        <div className="absolute -right-[12%] -top-[5%] size-[55%] rounded-full border border-white/[0.08]" />
        <div className="absolute -bottom-[35%] -left-[20%] size-[75%] rounded-full bg-white/[0.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 dark:bg-black/20"></div>

      {/* Content */}
      <div className="relative z-10 flex min-h-full flex-col justify-between gap-3 px-5 py-8 lg:gap-10 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12">
        {/* Brand */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-sm backdrop-blur-sm sm:size-10">
            <ShoppingBag
              className="size-4 text-white sm:size-[18px]"
              strokeWidth={2}
            />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-white/80 lg:text-xs">
            Welcome to Shop Cart
          </span>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col justify-between gap-9 py-4 gap-6 sm:gap-8 lg:gap-10">
          {/* Heading */}
          <div className="flex flex-col justify-center grow">
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-text-white/60 sm:mb-4 lg:text-xs">
              It's Good to Have You Here
            </span>

            <h1 className="mb-4 text-2xl font-extrabold leading-[1.2] tracking-tight text-text-white lg:text-3xl xl:text-4xl">
              Your Shopping
              <span className="block text-text-white/65">
                Journey Starts Here.
              </span>
            </h1>

            <p className="text-xs leading-6 text-text-white/75 lg:text-sm lg:leading-7 xl:text-[14px]">
              Create your account and make every shopping experience more
              personal. Discover new favorites and enjoy more of what you love.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-col justify-between gap-5 sm:gap-6 grow">
            {/* Feature 1 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white shadow-sm backdrop-blur-sm sm:size-10">
                <Tag className="size-4 sm:size-[18px]" strokeWidth={1.8} />
              </span>

              <div className="min-w-0 pt-0.5">
                <h3 className="text-xs font-bold text-text-white lg:text-sm">
                  Exclusive Offers
                </h3>
                <p className="mt-1 text-[10px] leading-5 text-text-white/65 lg:text-xs">
                  Get access to special deals and exciting discounts.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white shadow-sm backdrop-blur-sm sm:size-10">
                <Heart className="size-4 sm:size-[18px]" strokeWidth={1.8} />
              </span>

              <div className="min-w-0 pt-0.5">
                <h3 className="text-xs font-bold text-text-white lg:text-sm">
                  Made for You
                </h3>
                <p className="mt-1 text-[10px] leading-5 text-text-white/65 lg:text-xs">
                  Save your favorites and build your own wishlist.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white shadow-sm backdrop-blur-sm sm:size-10">
                <Gift className="size-4 sm:size-[18px]" strokeWidth={1.8} />
              </span>

              <div className="min-w-0 pt-0.5">
                <h3 className="text-xs font-bold text-text-white lg:text-sm">
                  A Better Experience
                </h3>
                <p className="mt-1 text-[10px] leading-5 text-text-white/65 lg:text-xs">
                  Enjoy a seamless shopping experience every time.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="shrink-0 grow flex flex-col justify-end text-center">
            <div className="h-px w-full bg-white/20" />

            <p className="mt-5 text-[10px] font-semibold tracking-[0.15em] text-text-white/65 lg:text-xs lg:tracking-[0.18em]">
              A LITTLE MORE YOU. A LOT MORE TO DISCOVER.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(WelcomeSection);
