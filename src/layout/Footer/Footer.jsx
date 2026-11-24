import React from "react";
import {
  ShoppingBag,
  ArrowUpRight,
  Mail,
  MapPin,
  CreditCard,
  ShieldCheck,
  Truck,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const Footer = () => {
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Home", to: "/" },
        { name: "All Products", to: "/products" },
        { name: "Categories", to: "/categories" },
        { name: "Brands", to: "/brands" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "My Account", to: "/profile" },
        { name: "My Orders", to: "/orders" },
        { name: "Shopping Cart", to: "/cart" },
        { name: "Wishlist", to: "/wishlist" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "About Us", to: "/about" },
        { name: "Contact Us", to: "/contact" },
        { name: "Privacy Policy", to: "/privacy-policy" },
        { name: "Terms & Conditions", to: "/terms" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaXTwitter, href: "#", label: "X" },
    { icon: FaYoutube, href: "#", label: "Youtube" },
  ];

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-border bg-bg-surface">
      {/* Newsletter */}
      <div className="section-container relative border-b border-border">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          {/* Newsletter Content */}
          <div className="flex shrink-0 flex-col text-center lg:text-left">
            <span className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-primary sm:text-[10px] md:text-[11px]">
              Stay Connected
            </span>

            <h2 className="text-xl font-extrabold leading-tight tracking-tight text-text-primary min-[400px]:text-2xl sm:text-3xl md:text-4xl">
              Get the latest{" "}
              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                offers & updates
              </span>
            </h2>

            <p className="mt-2 text-[11px] leading-5 text-text-secondary min-[400px]:text-xs sm:text-sm sm:leading-6">
              Subscribe to our newsletter and never miss our latest deals and
              exclusive offers.
            </p>
          </div>

          {/* Newsletter Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full min-w-0 items-center gap-4 lg:w-[45%]"
          >
            <div className="min-w-0 flex-1">
              <Input
                type="email"
                required
                placeholder="Enter your email address"
                startIcon={
                  <Mail
                    size={17}
                    className="shrink-0 text-text-muted sm:size-[19px]"
                  />
                }
              />
            </div>

            <Button
              type="submit"
              endIcon={
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              }
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-container relative grid grid-cols-3 justify-items-center gap-x-4 gap-y-8 min-[400px]:grid-cols-3 min-[400px]:gap-x-5 min-[400px]:gap-y-9 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-10">
        {/* Brand Info */}
        <div className="col-span-3 flex flex-col items-center text-center md:col-span-4 lg:col-span-2 lg:items-start lg:text-left overflow-hidden">
          <Link to="/" className="group mb-5 flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-active text-white shadow transition-transform duration-300 group-hover:scale-105 sm:size-10 will-change-transform">
              <ShoppingBag className="size-4.5 sm:size-5" strokeWidth={2.2} />
            </div>

            <span className="text-lg font-extrabold tracking-tight text-text-primary sm:text-xl">
              Shop<span className="text-primary">Cart.</span>
            </span>
          </Link>

          <p className="text-[11px] leading-6 text-text-secondary text-center sm:text-xs sm:leading-7 md:text-sm lg:text-left">
            Your one-stop destination for quality products, amazing deals, and a
            seamless shopping experience. Shop smarter, live better.
          </p>

          {/* Contact */}
          <div className="mt-5 flex flex-row lg:flex-col items-center gap-5 md:gap-3 lg:items-start">
            <div className="flex items-center gap-1.5 text-[11px] text-text-secondary sm:text-xs">
              <MapPin size={15} className="shrink-0 text-primary" />
              <span>Egypt</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-text-secondary sm:text-xs">
              <Mail size={15} className="shrink-0 text-primary" />
              <span>support@shopcart.com</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-4 flex items-center justify-center gap-2 sm:mt-5 sm:gap-2.5 lg:mt-6 lg:justify-start">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex size-7 items-center justify-center rounded-md border border-border bg-bg-main text-text-secondary transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white min-[400px]:size-8 min-[400px]:rounded-lg sm:size-9"
              >
                <Icon className="size-3 min-[400px]:size-3.5 sm:size-4" />
              </a>
            ))}
          </div>
        </div>
        {/* Footer Links */}
        {footerLinks.map((group) => (
          <div
            key={group.title}
            className="flex w-full min-w-0 flex-col items-center text-center"
          >
            <h3 className="mb-3 text-[11px] font-bold leading-none text-text-primary min-[400px]:mb-3.5 min-[400px]:text-xs sm:mb-4 sm:text-sm md:mb-5 md:text-base">
              {group.title}
            </h3>

            <ul className="flex flex-col items-center gap-2.5 min-[400px]:gap-3 sm:gap-3.5">
              {group.links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="group relative w-fit inline-flex items-center justify-center gap-1 text-[10px] text-text-secondary transition-colors duration-200 hover:text-primary min-[400px]:text-[11px] sm:text-xs md:text-sm"
                  >
                    <span>{link.name}</span>

                    <ArrowUpRight className="absolute left-full ml-0.5 size-2.5 -translate-x-1 translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 md:size-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="section-container relative border-t border-border bg-bg-main/60">
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <p className="text-center text-[10px] text-text-secondary sm:text-xs">
            © {new Date().getFullYear()} Shop Cart. All rights reserved.
          </p>

          {/* Shopping Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6">
            <div className="flex items-center gap-1.5 text-[10px] text-text-secondary sm:text-xs">
              <ShieldCheck size={15} className="text-primary" />
              Secure Payments
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-text-secondary sm:text-xs">
              <Truck size={15} className="text-primary" />
              Fast Delivery
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-text-secondary sm:text-xs">
              <CreditCard size={15} className="text-primary" />
              Easy Checkout
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
