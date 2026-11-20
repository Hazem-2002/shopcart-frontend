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
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg-card shadow transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Images */}
      <div className="relative overflow-hidden bg-bg-card will-change-transform">
        {/* Product Badges */}
        <div className="absolute left-2.5 top-2.5 z-10 flex flex-col gap-1.5 sm:left-3 sm:top-3 sm:gap-2">
          {hasDiscount && (
            <span className="w-fit rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold text-white shadow-sm sm:px-2.5 sm:text-xs">
              -{discountPercentage}%
            </span>
          )}

          {product.isFeatured && (
            <span className="flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[10px] font-semibold text-white sm:px-2.5 sm:text-xs">
              <Star className="!size-2.5 sm:!size-3" fill="currentColor" />
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
          className={`!absolute !right-2.5 !top-2.5 !z-10 !flex !size-8 !items-center !justify-center !rounded-full !bg-bg-surface !shadow-sm !transition hover:!scale-110 will-change-transform min-[400px]:!size-9 sm:!right-3 sm:!top-3 ${isFavorite ? "!text-danger" : "!text-text-secondary hover:!text-danger"}`}
        >
          <Heart
            className="!size-4 min-[400px]:!size-[18px]"
            fill={isFavorite ? "currentColor" : "none"}
          />
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
              className="items-center justify-center bg-white p-4 !flex !h-52 !w-full relative min-[400px]:!h-56 sm:!h-60 md:!h-64 sm:p-5 md:p-6"
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
          className="!absolute !bottom-2.5 !left-1/2 !z-10 !flex !-translate-x-1/2 !translate-y-3 !items-center !gap-1.5 !whitespace-nowrap !rounded-full !bg-bg-surface/85 !px-3 !py-1.5 !text-[10px] !font-semibold !text-text-secondary !opacity-0 !shadow-md !backdrop-blur-sm !transition !duration-300 hover:!bg-primary hover:!text-white group-hover:!-translate-y-2 group-hover:!opacity-100 min-[400px]:!bottom-3 min-[400px]:!px-4 min-[400px]:!py-2 min-[400px]:!text-xs"
        >
          <Eye className="!size-3 min-[400px]:!size-[15px]" />
          Quick View
        </Button>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col gap-2.5 p-3 min-[400px]:gap-3 min-[400px]:p-3.5 sm:p-4">
        {/* Brand & SKU */}
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[10px] font-bold uppercase tracking-wider text-primary min-[400px]:text-[11px] sm:text-xs">
            {product.brand?.name}
          </span>

          <span className="truncate text-[9px] text-text-secondary min-[400px]:text-[10px]">
            {product.sku}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="line-clamp-2 text-xs font-bold leading-[1.4] text-text-primary transition-colors group-hover:text-primary min-[400px]:text-[13px] sm:text-sm sm:leading-5">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 min-[400px]:gap-2">
          <Rating
            name={`product-rating-${product._id}`}
            value={Number(product.ratingsAverage) || 0}
            size="small"
            precision={0.5}
            readOnly
            className="[&_.MuiRating-iconEmpty]:!text-secondary [&_.MuiRating-icon]:!text-[15px] min-[400px]:[&_.MuiRating-icon]:!text-[18px]"
            getLabelText={(value) => `${value} Star${value !== 1 ? "s" : ""}`}
          />

          <span className="shrink-0 text-[10px] font-semibold text-text-primary min-[400px]:text-xs">
            {(Number(product.ratingsAverage) || 0).toFixed(1)}
          </span>

          <span className="shrink-0 text-[10px] text-text-secondary min-[400px]:text-xs">
            ({product.ratingsQuantity || 0})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex flex-wrap items-center gap-1.5 min-[400px]:gap-2">
          <span className="text-base font-extrabold text-text-primary min-[400px]:text-[17px] sm:text-lg">
            {formatPrice(product.priceAfterDiscount)}
          </span>

          {hasDiscount && (
            <span className="text-[10px] font-medium text-text-secondary line-through min-[400px]:text-xs">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="flex items-center justify-between gap-1">
          <div
            className={`
          flex items-center gap-1
          text-[10px] font-medium min-[400px]:gap-1.5 min-[400px]:text-[11px] sm:text-xs
          ${
            isOutOfStock
              ? "text-danger"
              : product.stock <= 5
                ? "text-danger"
                : "text-success"
          }
        `}
          >
            {!isOutOfStock && (
              <Check className="!size-3 min-[400px]:!size-3.5" />
            )}

            {isOutOfStock
              ? "Out of Stock"
              : product.stock <= 5
                ? `Only ${product.stock} left`
                : "In Stock"}
          </div>

          <span className="shrink-0 text-[9px] font-bold text-text-secondary min-[400px]:text-[10px] sm:text-[11px]">
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
          iconSize={15}
          onClick={(event) => {
            event.stopPropagation();
            setIsQuickViewOpen(true);
          }}
          className="!mt-1 !px-2.5 !py-2 !text-[11px] active:!scale-[0.98] !will-change-transform min-[400px]:!px-3 min-[400px]:!py-2.5 min-[400px]:!text-xs sm:!px-4 sm:!text-sm disabled:!cursor-not-allowed disabled:!bg-gray-300 dark:disabled:!bg-gray-800 disabled:!text-gray-500"
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
