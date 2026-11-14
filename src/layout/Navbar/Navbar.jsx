import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search, Heart, ShoppingCart, UserRound, Menu } from "lucide-react";

import Logo from "./Components/logo";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import IconButton from "../../components/IconButton";
import MenuDrawer from "./Components/Drawer";

const links = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Hot Deals", href: "/hot-deals" },
];

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { count: wishlistCount } = useSelector((store) => store.wishlist);
  const { count: cartCount } = useSelector((store) => store.cart);

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  return (
    <>
      <header className="sticky top-0 z-50 h-18 w-full max-w-[100vw] bg-bg-navbar shadow flex items-center">
        <div className="max-sm:w-full sm:container mx-auto px-4 py-4">
          {/* Main Header */}
          <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-3 xs:gap-6 items-center justify-between">
            {/* Menu Mobile */}
            <div className="lg:hidden flex justify-start">
              <IconButton ariaLabel="Menu" onClick={toggleDrawer}>
                <Menu className="size-5 sm:size-5.5" />
              </IconButton>
            </div>

            {/* Logo */}
            <Link to="/" className="flex justify-center">
              <Logo />
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:inline-block">
              <ul className="flex items-center gap-6 justify-center">
                {links.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.href}
                      end={link.href === "/"}
                      className={({ isActive }) => `
                        relative py-2
                        text-sm
                        font-semibold
                        transition-colors duration-200
                        ${
                          isActive
                            ? "text-primary"
                            : "text-text-primary hover:text-primary-hover"
                        }
                        after:absolute
                        after:bottom-0
                        after:left-0
                        after:h-[2px]
                        after:rounded-full
                        after:bg-primary
                        after:transition-all
                        after:duration-200
      
                        ${
                          isActive
                            ? "after:w-full"
                            : "after:w-0 hover:after:w-full"
                        }
                      `}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-8 justify-end">
              <div className="flex gap-1 xs:gap-3 items-center">
                {/* Search */}
                <IconButton ariaLabel="Search">
                  <Search className="!size-4 xs:!size-5" strokeWidth={1.8} />
                </IconButton>

                {/* Wishlist */}
                <Badge
                  ariaLabel="Wishlist"
                  value={wishlistCount}
                  icon={
                    <Heart className="!size-4 xs:!size-5" strokeWidth={1.8} />
                  }
                  badgeClassName={"!text-[10px] xs:!text-[11px] !p-0.5 xs:!p-1"}
                />

                {/* Cart */}
                <Badge
                  ariaLabel="Cart"
                  value={cartCount}
                  icon={
                    <ShoppingCart
                      className="!size-4 xs:!size-5"
                      strokeWidth={1.8}
                    />
                  }
                  badgeClassName={"!text-[10px] xs:!text-[11px] !p-0.5 xs:!p-1"}
                />
              </div>

              {/* Login */}
              <Button
                value="Login"
                startIcon={<UserRound />}
                iconSize={15}
                variant="contained"
                className="max-lg:!hidden !shrink-0"
              />
            </div>
          </div>
        </div>
      </header>
      <MenuDrawer open={openDrawer} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default Header;
