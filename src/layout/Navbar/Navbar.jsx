import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search, Heart, ShoppingCart, Menu } from "lucide-react";

import Logo from "./Components/logo";
// import Button from "../../components/Button";
import Badge from "../../components/UI/Badge";
import IconButton from "../../components/UI/IconButton";
import MenuDrawer from "./Components/Drawer";
import NavbarAuth from "./Components/NavbarAuth";

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
      <header className="sticky top-0 z-50 w-full max-w-full h-16 sm:h-18 bg-bg-navbar shadow flex items-center">
        <div className="w-full sm:container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          {/* Main Header */}
          <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-3 items-center gap-2 sm:gap-4">
            {/* Menu Mobile */}
            <div className="lg:hidden flex justify-start shrink-0">
              <IconButton ariaLabel="Menu" onClick={toggleDrawer}>
                <Menu className="!size-5 sm:!size-5.5" />
              </IconButton>
            </div>

            {/* Logo */}
            <Link to="/" className="flex justify-center items-center min-w-0">
              <Logo />
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex justify-center min-w-0">
              <ul className="flex items-center gap-4 xl:gap-6">
                {links.map((link) => (
                  <li key={link.name} className="shrink-0">
                    <NavLink
                      to={link.href}
                      end={link.href === "/"}
                      className={({ isActive }) => `
                  relative py-2
                  text-sm
                  font-semibold
                  whitespace-nowrap
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
                  ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
                `}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 sm:gap-4 lg:gap-5 xl:gap-8 min-w-0">
              <div className="flex items-center gap-0.5 xs:gap-2 sm:gap-3 shrink-0">
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
                  badgeClassName="!text-[10px] xs:!text-[11px] !p-0.5 xs:!p-1"
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
                  badgeClassName="!text-[10px] xs:!text-[11px] !p-0.5 xs:!p-1"
                />
              </div>

              {/* Login */}
              <NavbarAuth />
            </div>
          </div>
        </div>
      </header>

      <MenuDrawer open={openDrawer} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default Header;
