import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  UserRound,
  ChevronDown,
  User,
  Package,
  Heart,
  LogOut,
} from "lucide-react";

import Button from "../../../components/UI/Button";
// import { logout } from "../../features/auth/authSlice";

const NavbarAuth = () => {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout
  const handleLogout = () => {
    // dispatch(logout());
    setIsOpen(false);
    navigate("/login");
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
          className="max-lg:!hidden !shrink-0"
        />
      ) : (
        <div ref={dropdownRef} className="relative max-lg:!hidden">
          {/* Account Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-border bg-bg-surface px-3 py-2 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5"
          >
            {/* Avatar */}
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserRound size={17} />
            </div>

            {/* User Info */}
            <div className="flex flex-col items-start">
              <span className="max-w-[110px] truncate text-xs font-semibold text-text-primary">
                {user?.name || "My Account"}
              </span>
              <span className="text-[10px] text-secondary">My Account</span>
            </div>

            <ChevronDown
              size={15}
              className={`ml-1 text-secondary transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-[230px] overflow-hidden rounded-xl border border-border bg-bg-surface shadow-xl shadow-black/10 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* User Info */}
              <div className="border-b border-border px-4 py-3">
                <p className="truncate text-sm font-semibold text-text-primary">
                  {user?.name || "My Account"}
                </p>
                <p className="mt-0.5 truncate text-xs text-secondary">
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
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-secondary transition-colors duration-200 hover:bg-primary/8 hover:text-primary"
                  >
                    <Icon size={17} strokeWidth={1.8} />
                    <span className="font-medium">{label}</span>
                  </Link>
                ))}
              </div>

              {/* Logout */}
              <div className="border-t border-border p-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors duration-200 hover:bg-red-500/8"
                >
                  <LogOut size={17} strokeWidth={1.8} />
                  <span>Logout</span>
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
