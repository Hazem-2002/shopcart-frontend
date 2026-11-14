import React from "react";

import { ShoppingCart } from "`lucide-react`";

const Logo = () => {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 text-primary hover:text-primary-hover transition group shrink-0">
      {/* Cart Icon */}
      <div className="relative shrink-0">
        <div className="animate-bounce size-fit absolute -right-1 -top-1">
          <div className="size-1.5 sm:size-2 rounded-full relative bg-warning group-hover:bg-primary z-1 transition">
            <div className="absolute inset-0 rounded-full bg-warning group-hover:bg-primary z-1 transition animate-ping opacity-60" />
          </div>
        </div>

        <ShoppingCart className="rotate-y-180 size-4.5 xs:size-5 sm:size-5.5 lg:size-6 group-hover:scale-110 will-change-transform transition duration-200" />
      </div>

      {/* Logo Text */}
      <h1 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-extrabold tracking-[0.12em] uppercase whitespace-nowrap leading-none">
        <span>shop</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-tr group-hover:bg-gradient-to-bl from-primary hover:primary-hover to-warning transition">
          cart
        </span>
      </h1>

      {/* Decorative Dots */}
      <div className="hidden xs:flex flex-col gap-1 shrink-0">
        <div className="size-1 rounded-full bg-primary group-hover:bg-warning transition" />
        <div className="size-1 rounded-full bg-warning group-hover:bg-primary transition" />
      </div>
    </div>
  );
};

export default React.memo(Logo);
