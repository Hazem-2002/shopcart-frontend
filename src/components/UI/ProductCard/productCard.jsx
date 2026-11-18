import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

// Components
import { toast } from "react-toastify";
import { IconButton, Rating } from "@mui/material";
import QuickViewModal from "../QuickViewModal/QuickViewModal";
import Button from "../Button";

// Thunks
import { addToWishlist } from "../../../features/wishlist/thunks/addToWishlist";
import { deleteFromWishlist } from "../../../features/wishlist/thunks/deleteFromWishlist";
import { optimisticToggleWishlist } from "../../../features/wishlist/wishlistSlice";

// Utils
import { formatPrice } from "../../../utils/formatPrice";

import {
  Heart,
  ShoppingCart,
  Star,
  Check,
  Eye,
  ArrowUpRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./productCardSwiper.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const swiperRef = useRef(null);
  const { wishlist, isLoading } = useSelector((store) => store.wishlist);

  const isFavorite = wishlist.some((item) => item._id === product._id);

  const handleMouseEnter = () => {
    if (swiperRef.current && !swiperRef.current.destroyed) {
      swiperRef.current.autoplay.start();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && !swiperRef.current.destroyed) {
      swiperRef.current.autoplay.stop();
      swiperRef.current.slideTo(0);
    }
  };

  const hasDiscount = product.priceAfterDiscount < product.price;

  const discountPercentage = hasDiscount
    ? Number(
        (
          ((product.price - product.priceAfterDiscount) / product.price) *
          100
        ).toFixed(1),
      )
    : 0;

  const isOutOfStock = product.stock <= 0;

  const images = [
    ...new Set(
      [
        product.productCover?.image_url,
        ...(product.productImages || []).map((image) => image.image_url),
      ].filter(Boolean),
    ),
  ];

  const handleWishlist = () => {
    const exists = wishlist.some((item) => item._id === product._id);

    dispatch(optimisticToggleWishlist(product._id));

    if (exists) {
      dispatch(deleteFromWishlist(product._id));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product._id));
      toast.success("Added to wishlist");
    }
  };

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Images */}
      <div className="relative overflow-hidden bg-bg-card will-change-transform">
        {/* Product Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          {hasDiscount && (
            <span className="rounded-md w-fit bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
              -{discountPercentage}%
            </span>
          )}

          {product.isFeatured && (
            <span className="flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-white">
              <Star size={12} fill="currentColor" />
              Featured
            </span>
          )}
        </div>

        {/* Wishlist */}
        <IconButton
          type="button"
          aria-label="Toggle wishlist"
          disabled={isLoading}
          onClick={(e) => handleWishlist(e, product._id)}
          className={`!absolute !right-3 !top-3 !z-10 !flex !size-9 !items-center !justify-center !rounded-full !bg-bg-surface !shadow-sm !transition hover:!scale-110 will-change-transform ${isFavorite ? "!text-danger" : "!text-text-secondary hover:!text-danger"}`}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </IconButton>

        {/* Swiper */}
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          modules={[Navigation, Pagination, EffectFade, Autoplay]}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          speed={500}
          loop={images.length > 1}
          autoplay={{
            delay: 1800,
            disableOnInteraction: false,
          }}
          navigation={images.length > 1}
          pagination={{
            clickable: true,
          }}
          allowTouchMove
          grabCursor={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.autoplay.stop();
          }}
          className="
            product-swiper !w-full rounded-b-full overflow-hidden border-b border-border

            [&_.swiper-button-prev]:!invisible
            [&_.swiper-button-next]:!invisible
            [&_.swiper-pagination-bullet]:!invisible

            [&:hover_.swiper-button-prev]:!visible
            [&:hover_.swiper-button-next]:!visible
            [&:hover_.swiper-pagination-bullet]:!visible
          "
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={`${image}-${index}`}
              className="items-center justify-center bg-white p-6 !flex !h-64 !w-full relative"
            >
              <img
                src={image}
                alt={`${product.name} ${index + 1}`}
                loading="lazy"
                className="size-full object-contain transition-transform duration-500 ease-out group-hover:scale-110 will-change-transform"
              />

              <div className="hidden dark:inline-block absolute inset-0 flex items-center justify-center bg-black/15 transition duration-300"></div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Quick View */}
        <Button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            console.log("Quick View:", product);
          }}
          variant="custom"
          className="!absolute !bottom-3 !left-1/2 !z-10 !flex !-translate-x-1/2 !translate-y-3 !items-center !gap-2 !whitespace-nowrap !rounded-full !bg-bg-surface/85 !px-4 !py-2 !text-xs !font-semibold !text-text-secondary !opacity-0 !shadow-md !backdrop-blur-sm !transition !duration-300 hover:!bg-primary hover:!text-white group-hover:!-translate-y-3 group-hover:!opacity-100"
        >
          <Eye size={15} />
          Quick View
        </Button>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Brand & SKU */}
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs font-bold uppercase tracking-wider text-primary">
            {product.brand?.name}
          </span>

          <span className="truncate text-[10px] text-text-secondary">
            {product.sku}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="line-clamp-2 text-sm font-bold leading-5 text-text-primary transition-colors group-hover:text-primary">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Rating
            name={`product-rating-${product._id}`}
            value={Number(product.ratingsAverage) || 0}
            size="small"
            precision={0.5}
            readOnly
            className="[&_.MuiRating-iconEmpty]:!text-secondary"
            getLabelText={(value) => `${value} Star${value !== 1 ? "s" : ""}`}
          />

          <span className="shrink-0 text-xs font-semibold text-text-primary">
            {(Number(product.ratingsAverage) || 0).toFixed(1)}
          </span>

          <span className="shrink-0 text-xs text-text-secondary">
            ({product.ratingsQuantity || 0})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex flex-wrap items-center gap-2">
          <span className="text-lg font-extrabold text-text-primary">
            {formatPrice(product.priceAfterDiscount)}
          </span>

          {hasDiscount && (
            <span className="text-xs font-medium text-text-secondary line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="flex items-center justify-between">
          <div
            className={`
              flex items-center gap-1.5
              text-xs font-medium
              ${
                isOutOfStock
                  ? "text-danger"
                  : product.stock <= 5
                    ? "text-danger"
                    : "text-success"
              }
            `}
          >
            {!isOutOfStock && <Check size={14} />}

            {isOutOfStock
              ? "Out of Stock"
              : product.stock <= 5
                ? `Only ${product.stock} left`
                : "In Stock"}
          </div>

          <span className="text-[11px] text-text-secondary font-bold">
            {product.variants?.length || 0} Variants
          </span>
        </div>

        {/* Add To Cart */}
        <Button
          type="button"
          disabled={isOutOfStock}
          variant="contained"
          startIcon={<ShoppingCart />}
          endIcon={
            <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 will-change-transform active:rotate-360" />
          }
          iconSize={17}
          onClick={(event) => {
            event.stopPropagation();
            setIsQuickViewOpen(true);
          }}
          className="!mt-1 !px-4 !py-2.5 !text-sm active:!scale-[0.98] !will-change-transform disabled:!cursor-not-allowed disabled:!bg-gray-300 dark:disabled:!bg-gray-800 disabled:!text-gray-500"
        >
          <span className="!grow text-start">
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </span>
        </Button>
      </div>
      <QuickViewModal
        open={isQuickViewOpen}
        product={product}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </article>
  );
};

export default React.memo(ProductCard);
