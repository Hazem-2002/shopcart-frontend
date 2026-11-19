import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Drawer from "@mui/material/Drawer";
import CircularProgress from "@mui/material/CircularProgress";

import { setTheme } from "../../../features/theme/themeSlice";
import { logout } from "../../../features/auth/thunks/logout";

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
  Sun,
  Moon,
  LogOut,
} from "lucide-react";

import Logo from "./logo";
import IconButton from "../../../components/UI/IconButton";
import Button from "../../../components/UI/Button";
import Avatar from "@mui/material/Avatar";

const MenuDrawer = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector((store) => store.categories.categories);
  const { isAuthenticated, user, isLoading } = useSelector(
    (store) => store.auth,
  );
  const { mode } = useSelector((store) => store.theme);

  const navigationLinks = [
    { name: "Home", href: "/", icon: <House /> },
    { name: "Shop", href: "/shop", icon: <PanelsTopLeft /> },
    { name: "Categories", href: "/categories", icon: <Shapes /> },
    { name: "Brands", href: "/brands", icon: <Tags /> },
    { name: "Blog", href: "/blog", icon: <Newspaper /> },
    { name: "Hot Deals", href: "/hot-deals", icon: <Flame /> },
  ];

  const supportLinks = [
    { name: "Help Support", href: "/help", icon: <LifeBuoy /> },
    { name: "Contact Us", href: "/contact", icon: <MessageCircleMore /> },
    { name: "About Us", href: "/about", icon: <Info /> },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    toggleDrawer();
  };

  const renderLinks = (links) =>
    links.map((link) => (
      <li key={link.name} className="w-full">
        <NavLink
          to={link.href}
          onClick={toggleDrawer}
          className={({ isActive }) =>
            `group relative flex w-full min-w-0 items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-semibold transition duration-200 ${
              isActive
                ? "bg-primary/7 dark:bg-primary/25 text-primary dark:text-text-primary border-l border-primary shadow"
                : "text-text-primary hover:bg-primary/4 hover:text-primary"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`flex shrink-0 items-center justify-center transition-transform duration-200 ${
                  isActive
                    ? "text-primary dark:text-text-primary"
                    : "group-hover:scale-110 will-change-transform"
                }`}
              >
                {React.cloneElement(link.icon, {
                  className: "size-4",
                  strokeWidth: 1.8,
                })}
              </span>

              <span className="min-w-0 flex-1 truncate">{link.name}</span>
            </>
          )}
        </NavLink>
      </li>
    ));

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      slotProps={{
        paper: {
          className:
            "!h-[100dvh] !bg-bg-main min-w-[70vw] sm:min-w-[60vw] md:min-w-[50vw] max-xs:w-[100vw] max-w-[100vw] !overflow-hidden",
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
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden overscroll-none">
          {/* Authentication */}
          {!isAuthenticated && (
            <div className="flex shrink-0 flex-col gap-4 m-4 mb-0 rounded-2xl border border-primary/10 bg-primary/[0.03] p-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold text-text-primary">
                  Welcome to ShopCart!
                </h3>

                <p className="text-xs text-text-secondary">
                  Join us for a better shopping experience.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <Button
                  value="Create Account"
                  className="!h-10 !w-full !rounded-xl !capitalize !font-semibold"
                  onClick={() => handleNavigate("/register")}
                />

                <Button
                  value="Sign In"
                  variant="outlined"
                  className="!h-10 !w-full !rounded-xl !capitalize !font-semibold"
                  onClick={() => handleNavigate("/login")}
                />
              </div>

              <p className="text-center text-[11px] leading-relaxed text-text-secondary">
                Sign in to track your orders, manage your wishlist, and enjoy a
                personalized shopping experience.
              </p>
            </div>
          )}

          {/* Scrollable Content */}
          <div className="min-h-0 flex-1 p-4 overflow-y-auto">
            <nav className="flex w-full flex-col gap-7">
              {/* Navigation */}
              <section className="w-full">
                <h2 className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-text-secondary">
                  Navigation
                </h2>

                <ul className="flex w-full flex-col gap-1">
                  {renderLinks(navigationLinks)}
                </ul>
              </section>

              {/* Support */}
              <section className="w-full">
                <h2 className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-text-secondary">
                  Support
                </h2>

                <ul className="flex w-full flex-col gap-1">
                  {renderLinks(supportLinks)}
                </ul>
              </section>
            </nav>

            {/* Categories */}
            <section className="mt-7 space-y-4">
              <h2 className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-text-secondary">
                Quick Categories
              </h2>

              {categories.length === 0 ? (
                <p className="px-3 text-sm text-text-muted">
                  No categories available.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 5).map((category) => (
                    <Link
                      key={category._id}
                      to={`/categories/${category.slug}`}
                      onClick={toggleDrawer}
                      className="max-w-full truncate rounded-full border border-border bg-bg-card px-3 py-2 text-xs font-semibold text-text-primary transition duration-200 hover:border-primary hover:bg-primary-light hover:text-primary"
                    >
                      {category.name}
                    </Link>
                  ))}

                  {categories.length > 1 && (
                    <Link
                      to="/categories"
                      onClick={toggleDrawer}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-bold text-white transition-colors duration-200 hover:bg-primary-active"
                    >
                      View All
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              )}
            </section>

            {/* Appearance */}
            <section className="mt-7 border-t border-border pt-5">
              <h2 className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-text-secondary">
                Appearance
              </h2>

              <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-bg-card px-3 py-2.5 sm:py-3">
                {/* Label */}
                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3 text-sm text-secondary">
                  {mode === "dark" ? (
                    <Moon size={17} strokeWidth={1.8} className="shrink-0" />
                  ) : (
                    <Sun size={17} strokeWidth={1.8} className="shrink-0" />
                  )}

                  <span className="truncate font-medium text-text-primary">
                    Appearance
                  </span>
                </div>

                {/* Theme Options */}
                <div className="flex shrink-0 items-center gap-1 rounded-lg bg-bg-muted p-1">
                  <button
                    type="button"
                    onClick={() => dispatch(setTheme("light"))}
                    aria-label="Light mode"
                    aria-pressed={mode === "light"}
                    className={`flex size-8 cursor-pointer items-center justify-center rounded-md transition-all duration-200 ${
                      mode === "light"
                        ? "bg-bg-surface text-primary shadow-sm"
                        : "text-secondary hover:text-text-primary"
                    }`}
                  >
                    <Sun size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => dispatch(setTheme("dark"))}
                    aria-label="Dark mode"
                    aria-pressed={mode === "dark"}
                    className={`flex size-8 cursor-pointer items-center justify-center rounded-md transition-all duration-200 ${
                      mode === "dark"
                        ? "bg-bg-surface text-primary shadow-sm"
                        : "text-secondary hover:text-text-primary"
                    }`}
                  >
                    <Moon size={15} />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        {isAuthenticated && (
          <footer className="shrink-0 border-t border-border p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* User Info */}
              <Link
                to="/profile"
                className="flex min-w-0 flex-1 items-center gap-2.5"
              >
                <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Avatar
                    src={user?.image?.image_url}
                    alt={user?.name || "User"}
                    className="!size-full !text-sm !font-semibold !uppercase !bg-primary/10 !text-primary"
                  >
                    {user?.name?.slice(0, 2)?.toUpperCase() || "U"}
                  </Avatar>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs sm:text-sm font-semibold text-text-primary">
                    {user?.name}
                  </p>

                  <p className="truncate text-[11px] sm:text-xs text-secondary">
                    {user?.email}
                  </p>
                </div>
              </Link>

              {/* Logout */}
              <button
                type="button"
                onClick={async () => {
                  await dispatch(logout()).unwrap();
                  toggleDrawer();
                  toast.success("Logged out successfully!");
                }}
                disabled={isLoading}
                className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-2 py-2 sm:px-3 text-xs sm:text-sm font-medium text-danger transition-colors duration-200 cursor-pointer hover:bg-danger/7 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <CircularProgress
                    size={16}
                    thickness={5}
                    sx={{ color: "currentColor" }}
                  />
                ) : (
                  <LogOut size={16} strokeWidth={1.8} />
                )}

                <span>{isLoading ? "Logging out" : "Logout"}</span>
              </button>
            </div>
          </footer>
        )}
      </div>
    </Drawer>
  );
};

export default React.memo(MenuDrawer);
