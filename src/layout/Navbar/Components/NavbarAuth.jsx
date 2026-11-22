import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { setTheme } from "../../../features/theme/themeSlice";

import CircularProgress from "@mui/material/CircularProgress";

import {
  UserRound,
  User,
  Package,
  Heart,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

import Avatar from "@mui/material/Avatar";
import Button from "../../../components/UI/Button";
import { logout } from "../../../features/auth/thunks/logout";
import { toast } from "react-toastify";

const NavbarAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const { mode } = useSelector((state) => state.theme);
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth,
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  // Logout
  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    setIsOpen(false);
    toast.success("Logged out successfully");
  };

  const menuItems = [
    {
      label: "My Profile",
      icon: User,
      path: "/profile",
    },
    {
      label: "My Orders",
      icon: Package,
      path: "/my-orders",
    },
    {
      label: "Wishlist",
      icon: Heart,
      path: "/wishlist",
    },
  ];

  return (
    <>
      {!isAuthenticated ? (
        <Button
          value="Login"
          startIcon={<UserRound />}
          iconSize={15}
          variant="contained"
          onClick={() => navigate("/login")}
          className="max-sm:!hidden !shrink-0"
        />
      ) : (
        <div ref={dropdownRef} className="relative max-sm:!hidden">
          {/* Account Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Account menu"
            aria-expanded={isOpen}
            className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-lg lg:rounded-full border border-border bg-bg-surface max-xl:pr-2 max-xl:py-0.5 xl:px-2 xl:py-1.5 shadow transition hover:border-primary-light hover:bg-primary-light/50"
          >
            <Avatar
              src={user?.image?.image_url}
              alt={user?.name || "User"}
              className="!size-9 lg:!size-10 !text-sm !font-semibold !uppercase !bg-primary/10 !text-primary"
            >
              {user?.name?.slice(0, 2)?.toUpperCase() || "U"}
            </Avatar>

            <div className="hidden xl:flex flex-col items-start leading-tight">
              <span className="max-w-[110px] truncate text-xs font-semibold text-text-primary">
                {user?.name}
              </span>

              <span className="text-[10px] capitalize text-secondary font-bold">
                {user?.role}
              </span>
            </div>

            <ChevronDown
              size={15}
              className={`text-secondary transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-1.5 w-[250px] overflow-hidden rounded-xl border border-border bg-bg-surface shadow-xl shadow-black/10 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* User Info */}
              <div className="border-b border-border px-4 py-3">
                <p className="truncate text-sm max-lg:text-[13px] font-semibold text-text-primary">
                  {user?.name}
                </p>

                <p className="mt-0.5 truncate text-xs max-lg:text-[11px] text-secondary">
                  {user?.email}
                </p>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                {menuItems.map(({ label, icon: Icon, path }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm max-lg:text-[13px] text-secondary transition-colors hover:bg-primary-light/50 hover:text-primary"
                  >
                    <Icon size={17} strokeWidth={1.8} />
                    <span className="font-medium">{label}</span>
                  </Link>
                ))}
              </div>

              {/* Theme Switcher */}
              <div className="border-t border-border p-2">
                <div className="flex items-center justify-between px-3 py-2">
                  {/* Label */}
                  <div className="flex items-center gap-3 text-sm max-lg:text-[13px] text-secondary">
                    {mode === "dark" ? (
                      <Moon size={17} strokeWidth={1.8} />
                    ) : (
                      <Sun size={17} strokeWidth={1.8} />
                    )}

                    <span className="font-medium">Appearance</span>
                  </div>

                  {/* Theme Options */}
                  <div className="flex items-center gap-1 rounded-lg bg-bg-muted p-1">
                    <button
                      type="button"
                      onClick={() => dispatch(setTheme("light"))}
                      aria-label="Light mode"
                      aria-pressed={mode === "light"}
                      className={`rounded-md p-1.5 transition-all duration-200 cursor-pointer ${
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
                      className={`rounded-md p-1.5 transition duration-200 cursor-pointer ${
                        mode === "dark"
                          ? "bg-bg-surface text-primary shadow-sm"
                          : "text-secondary hover:text-text-primary"
                      }`}
                    >
                      <Moon size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <div className="border-t border-border p-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm max-lg:text-[13px] font-medium text-danger transition-colors duration-200 hover:bg-danger/7 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <CircularProgress
                      size={17}
                      thickness={5}
                      sx={{ color: "currentColor" }}
                    />
                  ) : (
                    <LogOut size={17} strokeWidth={1.8} />
                  )}

                  <span>{isLoading ? "Logging out..." : "Logout"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(NavbarAuth);
