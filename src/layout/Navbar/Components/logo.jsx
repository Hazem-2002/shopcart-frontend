import React from "react";

import { ShoppingCart } from "`lucide-react`";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-primary hover:text-primary-hover transition group">
      <div className="relative">
        <div className="animate-bounce size-fit absolute -right-1 -top-1">
          <div className="size-1.5 lg:size-2 rounded-full relative bg-warning group-hover:bg-primary z-1 transition">
            <div className="absolute size-1.5 lg:size-2 rounded-full bg-warning group-hover:bg-primary z-1 transition animate-ping opacity-60"></div>
          </div>
        </div>
        <ShoppingCart className="rotate-y-180 max-xs:size-4.5 max-md:size-5.5 group-hover:scale-110 will-change-transform transition duration-200" />
      </div>

      <h1 className="text-base xs:text-xl md:text-2xl font-extrabold tracking-widest uppercase w-fit">
        <span>shop</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-tr group-hover:bg-gradient-to-bl from-primary hover:primary-hover to-warning transition">
          cart
        </span>
      </h1>
      <div className="hidden xs:flex flex-col gap-1">
        <div className="size-1 rounded-full bg-primary group-hover:bg-warning transition"></div>
        <div className="size-1 rounded-full bg-warning group-hover:bg-primary transition"></div>
      </div>
    </div>
  );
};

export default React.memo(Logo);
