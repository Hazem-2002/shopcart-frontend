import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Drawer from "@mui/material/Drawer";

import {
  X,
  House,
  PanelsTopLeft,
  Shapes,
  Tags,
  Newspaper,
  Flame,
  LifeBuoy,
  MessageCircleMore,
  Info,
  ArrowRight,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import Logo from "./logo";
import IconButton from "../../../components/IconButton";
import Button from "../../../components/Button";

const MenuDrawer = ({ open, toggleDrawer }) => {
  const categories = useSelector((store) => store.categories.categories);
  const navigationLinks = [
    {
      name: "Home",
      href: "/",
      icon: <House />,
    },
    {
      name: "Shop",
      href: "/shop",
      icon: <PanelsTopLeft />,
    },
    {
      name: "Categories",
      href: "/categories",
      icon: <Shapes />,
    },
    {
      name: "Brands",
      href: "/brands",
      icon: <Tags />,
    },
    {
      name: "Blog",
      href: "/blog",
      icon: <Newspaper />,
    },
    {
      name: "Hot Deals",
      href: "/hot-deals",
      icon: <Flame />,
    },
  ];

  const supportLinks = [
    {
      name: "Help Support",
      href: "/help",
      icon: <LifeBuoy />,
    },
    {
      name: "Contact Us",
      href: "/contact",
      icon: <MessageCircleMore />,
    },
    {
      name: "About Us",
      href: "/about",
      icon: <Info />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      slotProps={{
        paper: {
          className:
            "!h-[100dvh] !bg-bg-main min-w-[70vw] sm:min-w-[60vw] md:min-w-[50vw] !overflow-hidden",
        },
      }}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border p-4 gap-8">
          <Logo />

          <IconButton aria-label="Close menu" onClick={toggleDrawer}>
            <X strokeWidth={1.8} className="text-secondary size-5" />
          </IconButton>
        </header>

        {/* Content */}
        <div className="flex flex-col gap-4 p-4 overflow-hidden">
          {/* Authentication */}
          <div className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-primary/[0.03] p-4">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold text-text-primary">
                Welcome to ShopCart!
              </h3>
              <p className="text-xs text-text-secondary">
                Join us for a better shopping experience.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              <Button
                value="Create Account"
                className="!h-10 !w-full !rounded-xl !capitalize !font-semibold"
                // onClick={() => navigate("/register")}
              />

              <Button
                value="Sign In"
                variant="outlined"
                className="!h-10 !w-full !rounded-xl !capitalize !font-semibold"
                // onClick={() => navigate("/login")}
              />
            </div>

            {/* Footer */}
            <p className="text-center text-[11px] leading-relaxed text-text-secondary">
              Sign in to track your orders, manage your wishlist, and enjoy a
              personalized shopping experience.
            </p>
          </div>

          {/* Navigation */}
          <div className="overflow-auto">
            <nav className="flex flex-col gap-7">
              {/* Navigation */}
              <section>
                <h2 className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-text-secondary">
                  Navigation
                </h2>

                <ul className="flex flex-col gap-1">
                  {navigationLinks.map((link) => (
                    <li key={link.name}>
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `group relative flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition duration-200 ${isActive ? "bg-primary/7 dark:bg-primary/15 text-primary border-l border-primary shadow" : "text-text-primary hover:bg-primary/4 hover:text-primary"}`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={`transition-transform duration-200 ${isActive ? "text-primary" : "group-hover:scale-110 will-change-transform"}`}
                            >
                              {React.cloneElement(link.icon, {
                                className: "size-4",
                              })}
                            </span>

                            <span className="flex-1">{link.name}</span>
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Support */}
              <section>
                <h2 className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-text-secondary">
                  Support
                </h2>

                <ul className="flex flex-col gap-1">
                  {supportLinks.map((link) => (
                    <li key={link.name}>
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `group relative flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition duration-200 ${isActive ? "bg-primary/7 dark:bg-primary/15 text-primary border-l border-primary shadow" : "text-text-primary hover:bg-primary/4 hover:text-primary"}`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={`transition-transform duration-200 ${isActive ? "text-primary" : "group-hover:scale-110 will-change-transform"}`}
                            >
                              {React.cloneElement(link.icon, {
                                className: "size-4",
                              })}
                            </span>

                            <span className="flex-1">{link.name}</span>
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </section>
            </nav>

            {/* Categories */}
            <section className="mt-7 space-y-4">
              <h2 className="mb-5 px-3 text-xs font-bold uppercase tracking-widest text-text-secondary">
                Quick Categories
              </h2>

              {categories.length === 0 ? (
                <p className="text-sm text-text-muted">
                  No categories available.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 5).map((category) => (
                    <Link
                      key={category._id}
                      to={`/categories/${category.slug}`}
                      className=" rounded-full border border-border bg-bg-card px-3 py-1.5 text-xs font-semibold text-text-primary transition duration-200 hover:border-primary hover:bg-primary-light hover:text-primary"
                    >
                      {category.name}
                    </Link>
                  ))}

                  {categories.length > 1 && (
                    <Link
                      to="/categories"
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-white transition-colors duration-200 hover:bg-primary-active"
                    >
                      View All
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border p-4">
          <p className="text-center text-xs text-secondary">
            © {new Date().getFullYear()} Vendora. All rights reserved.
          </p>
        </footer>
      </div>
    </Drawer>
  );
};

export default React.memo(MenuDrawer);
