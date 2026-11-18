import React from "react";
import { ShoppingBag } from "lucide-react";
import "./AuthLoader.css";

const Loader = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg-main">
      <div className="flex flex-col items-center">
        {/* Animated Brand Icon */}
        <div className="auth-brand-wrapper">
          <div className="auth-brand-ring" />

          <div className="auth-brand-icon">
            <ShoppingBag size={34} strokeWidth={1.7} />
            <span className="auth-icon-shine" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-text-primary">
          Shop<span className="text-primary">Cart</span>
        </h1>

        {/* Loading Indicator */}
        <div className="auth-loader-line mt-8">
          <div className="auth-loader-line-progress" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Loader);
