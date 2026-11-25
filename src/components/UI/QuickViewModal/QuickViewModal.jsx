import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useMediaQuery } from "@mui/material";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Components
import Rating from "../Rating";
import IconButton from "../IconButton";
import Button from "../Button";
import QuickViewModalSwpier from "./QuickViewModalSwpier";
import { toast } from "react-toastify";

// Icons
import {
  X,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";

// Thunks and actions
import { addToCart } from "../../../features/cart/thunks/addToCart";
import { optimisticToggleWishlist } from "../../../features/wishlist/wishlistSlice";
import { addToWishlist } from "../../../features/wishlist/thunks/addToWishlist";
import { deleteFromWishlist } from "../../../features/wishlist/thunks/deleteFromWishlist";

import {
  optimisticAddToCart,
  rollbackAddToCart,
} from "../../../features/cart/cartSlice";

// Utils
import { formatPrice } from "../../../utils/formatPrice";

const QuickViewModal = ({ open, onClose, product }) => {
  const dispatch = useDispatch();
  const [mainSwiper, setMainSwiper] = useState(null);

  const { cart } = useSelector((store) => store.cart);
  const { wishlist } = useSelector((store) => store.wishlist);
  const { isAuthenticated } = useSelector((store) => store.auth);

  const isFavorite = useMemo(
    () => wishlist.some((item) => item._id === product._id),
    [product._id, wishlist],
  );

  const hasVariants = useMemo(
    () => product?.variants?.length > 0,
    [product.variants],
  );

  // Get the available variant with the highest quantity
  const availableVariant = useMemo(
    () =>
      product?.variants?.reduce((best, variant) => {
        if (variant.quantity <= 0) return best;

        return !best || variant.quantity > best.quantity ? variant : best;
      }, null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [selectedColor, setSelectedColor] = useState(
    availableVariant?.color?.color || "",
  );

  const [selectedSize, setSelectedSize] = useState(
    availableVariant?.size || "",
  );

  const [quantity, setQuantity] = useState(1);

  const uniqueImages = useMemo(
    () => [
      ...new Map(
        (product.productImages || [])
          .filter((item) => item.image_url)
          .map((item) => {
            const variant =
              product.variants?.find(
                (variant) => variant.image?.image_url === item.image_url,
              ) || null;

            return [
              item.image_url,
              {
                image: item.image_url,
                variant,
              },
            ];
          }),
      ).values(),
    ],
    [product.productImages, product.variants],
  );

  const colors = useMemo(
    () => [
      ...new Map(
        product?.variants
          ?.filter((variant) => variant.color?.color)
          .map((variant) => [variant.color.color, variant.color]),
      ).values(),
    ],
    [product.variants],
  );

  const sizes = useMemo(
    () => [
      ...new Set(
        product?.variants
          ?.filter((variant) => variant.size)
          .map((variant) => variant.size),
      ),
    ],
    [product.variants],
  );

  useEffect(() => {
    if (!availableVariant || !mainSwiper) return;

    const imageIndex = uniqueImages.findIndex(
      (item) => item.variant?._id === availableVariant._id,
    );

    if (imageIndex !== -1) {
      mainSwiper.slideToLoop(imageIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableVariant, mainSwiper]);

  const selectedVariant = useMemo(() => {
    return (
      product?.variants?.find(
        (variant) =>
          variant.color?.color === selectedColor &&
          variant.size === selectedSize,
      ) || null
    );
  }, [product.variants, selectedColor, selectedSize]);

  const hasDiscount = useMemo(() => {
    return (
      (selectedVariant?.priceAfterDiscount ?? product.priceAfterDiscount) <
      (selectedVariant?.price ?? product.price)
    );
  }, [product.price, product.priceAfterDiscount, selectedVariant]);

  const discountPercentage = useMemo(() => {
    if (!hasDiscount) return 0;

    const price = selectedVariant?.price ?? product.price;
    const priceAfterDiscount =
      selectedVariant?.priceAfterDiscount ?? product.priceAfterDiscount;

    return Math.round(((price - priceAfterDiscount) / price) * 100 * 10) / 10;
  }, [hasDiscount, product.price, product.priceAfterDiscount, selectedVariant]);

  const handleVariantChange = (color, size) => {
    const variant = product.variants.find(
      (variant) =>
        variant.color?.color === color &&
        variant.size === size &&
        variant.quantity > 0,
    );

    if (!variant) return;

    setSelectedColor(color);
    setSelectedSize(size);
    setQuantity(1);

    const imageIndex = uniqueImages.findIndex(
      (item) => item.variant?._id === variant._id,
    );

    if (imageIndex !== -1) {
      mainSwiper?.slideToLoop(imageIndex);
    }
  };

  const handleAddToCart = () => {
    let optimisticUpdated = false;
    let payload;

    try {
      if (!isAuthenticated) {
        throw new Error("Please login to add products to your cart.");
      }

      if (hasVariants && !selectedVariant) {
        throw new Error("Please select a variant before adding to cart.");
      }

      const stock = hasVariants ? selectedVariant.quantity : product.stock;

      const productInCart = cart?.cartItems.find(
        (item) => item.product._id === product._id,
      );

      const currentQuantity = hasVariants
        ? productInCart?.variants.find(
            (item) => item.variantId === selectedVariant._id,
          )?.quantity || 0
        : productInCart?.quantity || 0;

      if (currentQuantity + quantity > stock) {
        throw new Error("Not enough stock available.");
      }

      payload = {
        productId: product._id,
        quantity,
        ...(hasVariants && {
          variants: [{ variantId: selectedVariant._id, quantity }],
        }),
      };

      dispatch(optimisticAddToCart(payload));
      optimisticUpdated = true;

      dispatch(addToCart(payload));

      toast.success(`"${product.name}" added to cart`);
    } catch (error) {
      console.error("Add to cart failed:", error);

      if (optimisticUpdated) {
        dispatch(rollbackAddToCart(payload));
      }

      toast.error(error?.message || "Failed to add to cart. Please try again.");
    }
  };

  const handleWishlist = () => {
    let optimisticUpdated = false;

    try {
      if (!isAuthenticated) {
        throw new Error("Please login to manage your wishlist.");
      }

      const exists = wishlist.some((item) => item._id === product._id);

      dispatch(optimisticToggleWishlist(product._id));
      optimisticUpdated = true;

      if (exists) {
        dispatch(deleteFromWishlist(product._id));

        toast.success(`"${product.name}" removed from wishlist`);
      } else {
        dispatch(addToWishlist(product._id));

        toast.success(`"${product.name}" added to wishlist`);
      }
    } catch (error) {
      console.error("Wishlist update failed:", error);

      if (optimisticUpdated) {
        dispatch(optimisticToggleWishlist(product._id));
      }

      toast.error(
        error?.message || "Failed to update wishlist. Please try again.",
      );
    }
  };

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!uniqueImages.length) return null;

  return (
    <Dialog
      open={open}
      maxWidth={false}
      slotProps={{
        paper: {
          className:
            "!m-0 !max-w-none !shadow-none !bg-bg-card !w-[95vw] md:!w-[80vw] !h-[88vh] !rounded-lg !overflow-hidden py-2 lg:pl-2",
        },
        backdrop: { className: "!bg-black/15" },
      }}
    >
      <div className="w-full lg:grid lg:grid-cols-[.75fr_1fr] gap-6 h-[88vh] overflow-hidden">
        {/* Product Images Desktop */}
        {isDesktop && (
          <div className="h-[inherit]">
            <QuickViewModalSwpier
              product={product}
              setMainSwiper={setMainSwiper}
              setSelectedColor={setSelectedColor}
              setSelectedSize={setSelectedSize}
              mainSwiper={mainSwiper}
            />
          </div>
        )}

        {/* Product Details */}
        <div className="flex h-full min-h-0 flex-col overflow-hidden">
          {/* Header */}
          <DialogTitle className="!flex !shrink-0 !items-start !justify-between !gap-3 !border-b !border-border !px-4 !pt-4 !pb-4 sm:!px-6 sm:!pt-6">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-2">
              <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-primary">
                {product?.brand?.name}
              </p>

              <h2 className="line-clamp-2 break-words pr-1 text-base font-extrabold leading-tight text-text-primary sm:text-xl">
                {product?.name}
              </h2>

              <div className="mt-0.5">
                <Rating
                  ratingsAverage={product?.ratingsAverage}
                  ratingsQuantity={product?.ratingsQuantity}
                />
              </div>
            </div>

            <IconButton
              onClick={onClose}
              aria-label="Close quick view"
              className="!size-9 !shrink-0 sm:!size-10 !text-secondary"
            >
              <X size={18} />
            </IconButton>
          </DialogTitle>

          {/* Scrollable Content */}
          <DialogContent className="!pb-0 !mt-4 !mb-4 !min-h-0 !flex-1 !overflow-x-hidden !overflow-y-auto">
            {/* Product Images Mobile */}
            {!isDesktop && (
              <div className="border-b border-border pt-4 mb-6">
                <QuickViewModalSwpier
                  product={product}
                  setMainSwiper={setMainSwiper}
                  setSelectedColor={setSelectedColor}
                  setSelectedSize={setSelectedSize}
                  mainSwiper={mainSwiper}
                />
              </div>
            )}

            {/* Price & Stock */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
              {/* Price */}
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5">
                <span className="text-lg font-extrabold text-text-primary sm:text-xl lg:text-2xl">
                  {formatPrice(
                    selectedVariant?.priceAfterDiscount ??
                      product.priceAfterDiscount,
                  )}
                </span>

                {hasDiscount && (
                  <>
                    <span className="text-xs font-medium text-text-secondary line-through sm:text-sm">
                      {formatPrice(selectedVariant?.price ?? product.price)}
                    </span>

                    <span className="rounded-md bg-danger/10 px-2 py-1 text-[10px] font-bold text-danger sm:text-xs">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 backdrop-blur-md sm:gap-2 sm:px-3 sm:py-2 ${
                  (selectedVariant?.quantity ?? product?.stock) > 0
                    ? "border-success/20 bg-success/10"
                    : "border-danger/20 bg-danger/10"
                }`}
              >
                <span
                  className={`size-1.5 shrink-0 rounded-full ${
                    (selectedVariant?.quantity ?? product?.stock) > 0
                      ? "bg-success shadow-[0_0_8px_2px_rgba(34,197,94,0.4)]"
                      : "bg-danger shadow-[0_0_8px_2px_rgba(239,68,68,0.4)]"
                  }`}
                />

                <span
                  className={`whitespace-nowrap text-[10px] font-bold leading-none sm:text-xs ${
                    (selectedVariant?.quantity ?? product?.stock) > 0
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {(selectedVariant?.quantity ?? product?.stock) > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="mt-3 text-xs leading-5 text-text-secondary sm:mt-4 sm:text-sm sm:leading-6">
              {product?.shortDescription || product?.description}
            </p>

            {/* Variants */}
            {product?.variants?.length > 0 && (
              <div className="mt-5 space-y-5 sm:mt-6">
                {/* Colors */}
                {colors.length > 0 && (
                  <div>
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-text-primary">
                        Color
                      </h3>

                      <span className="text-xs font-medium text-text-secondary">
                        {selectedColor}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => {
                        const isAvailable = product.variants.some(
                          (variant) =>
                            variant.color?.color === color.color &&
                            (!sizes.length || variant.size === selectedSize) &&
                            variant.quantity > 0,
                        );

                        const isSelected = selectedColor === color.color;

                        return (
                          <Button
                            key={color.color}
                            type="button"
                            variant="custom"
                            disabled={!isAvailable}
                            onClick={() => {
                              handleVariantChange(color.color, selectedSize);
                            }}
                            className={`!flex !min-h-7 !items-center !gap-2 !rounded-lg !border !px-2.5 !py-2 !text-xs !font-semibold !transition sm:!min-h-8 sm:!px-3
                              ${
                                isSelected
                                  ? "!border-primary/25 !bg-primary/15 !text-primary"
                                  : "!border-border !text-text-secondary hover:!border-primary/15 hover:!bg-primary-light"
                              }
                              disabled:!cursor-not-allowed disabled:!border-border/50 disabled:!bg-surface/40 disabled:!text-text-secondary/40 disabled:!opacity-50
                            `}
                          >
                            <span
                              className="size-3.5 shrink-0 rounded-full border border-border sm:size-4"
                              style={{ backgroundColor: color.hex }}
                            />

                            {color.color}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {sizes.length > 0 && (
                  <div>
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-text-primary">
                        Size
                      </h3>

                      <span className="text-xs font-medium text-text-secondary">
                        {selectedSize}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => {
                        const isAvailable = product.variants.some(
                          (variant) =>
                            (!colors.length ||
                              variant.color?.color === selectedColor) &&
                            variant.size === size &&
                            variant.quantity > 0,
                        );

                        const isSelected = selectedSize === size;

                        return (
                          <Button
                            key={size}
                            type="button"
                            variant="custom"
                            disabled={!isAvailable}
                            onClick={() => {
                              handleVariantChange(selectedColor, size);
                            }}
                            className={`!flex !min-h-7 !items-center !gap-2 !rounded-lg !border !px-2.5 !py-2 !text-xs !font-semibold !transition sm:!min-h-8 sm:!px-3
                              ${
                                isSelected
                                  ? "!border-primary/25 !bg-primary/15 !text-primary"
                                  : "!border-border !text-text-secondary hover:!border-primary/15 hover:!bg-primary-light"
                              }
                              disabled:!cursor-not-allowed disabled:!border-border/50 disabled:!bg-surface/40 disabled:!text-text-secondary/40 disabled:!opacity-50
                            `}
                          >
                            {size}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Selected Variant */}
                {selectedVariant && (
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-surface/40 p-2.5 sm:gap-3 sm:p-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-text-secondary sm:text-xs">
                        Selected Variant
                      </p>

                      <p className="mt-1 break-words text-xs font-bold text-text-primary sm:text-sm">
                        {[
                          selectedVariant.color?.color,
                          selectedVariant.size,
                          selectedVariant.storage,
                          selectedVariant.material,
                        ]
                          .filter(Boolean)
                          .join(" / ")}
                      </p>
                    </div>

                    <span className="shrink-0 text-[10px] font-semibold text-success sm:text-xs">
                      {selectedVariant.quantity} Available
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 sm:mt-6">
              <span className="text-xs font-bold text-text-primary sm:text-sm">
                Quantity
              </span>

              <div className="flex w-fit shrink-0 items-center overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
                <Button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  variant="custom"
                  className="!flex !size-8 !min-w-0 !shrink-0 !items-center !justify-center !rounded-none !border-0 !bg-bg-hover !p-0 !text-text-primary transition-colors hover:!bg-border disabled:!cursor-not-allowed disabled:!opacity-40 sm:!size-9"
                >
                  <Minus
                    size={14}
                    strokeWidth={2.2}
                    className="!block !shrink-0 !text-text-primary"
                  />
                </Button>

                <span className="flex h-8 min-w-12 items-center justify-center border-x border-border bg-surface px-2 text-xs font-bold tabular-nums text-text-primary sm:h-9 sm:min-w-14 sm:text-sm">
                  {quantity}
                </span>

                <Button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(
                        selectedVariant?.quantity ?? product?.stock,
                        prev + 1,
                      ),
                    )
                  }
                  disabled={
                    quantity >= (selectedVariant?.quantity ?? product?.stock)
                  }
                  variant="custom"
                  className="!flex !size-8 !min-w-0 !shrink-0 !items-center !justify-center !rounded-none !border-0 !bg-bg-hover !p-0 !text-text-primary transition-colors hover:!bg-border disabled:!cursor-not-allowed disabled:!opacity-40 sm:!size-9"
                >
                  <Plus
                    size={14}
                    strokeWidth={2.2}
                    className="!block !shrink-0 !text-text-primary"
                  />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex items-center gap-2.5 sm:mt-6 sm:gap-3">
              <Button
                type="button"
                variant="contained"
                startIcon={<ShoppingCart strokeWidth={2} />}
                iconSize={18}
                onClick={handleAddToCart}
                disabled={product?.stock <= 0}
                className="!h-10 !min-w-0 !flex-1 !px-3 !text-xs !font-semibold hover:!shadow-md active:!scale-[0.98] sm:!h-11 sm:!text-sm"
              >
                {product?.stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </Button>

              <IconButton
                type="button"
                aria-label="Toggle wishlist"
                onClick={(e) => handleWishlist(e, product._id)}
                className={`!flex !size-10 !shrink-0 !items-center !justify-center !rounded-full !bg-bg-surface !shadow-sm !transition hover:!scale-110 will-change-transform sm:!size-11 ${
                  isFavorite
                    ? "!text-danger"
                    : "!text-text-secondary hover:!text-danger"
                }`}
              >
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              </IconButton>
            </div>

            {/* Service Features */}
            <div className="lg:pb-4 mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 border-t border-border pt-4 text-[10px] text-text-secondary sm:mt-5 sm:gap-x-5 sm:text-xs">
              <span className="flex items-center gap-1.5 whitespace-nowrap sm:gap-2">
                <Truck size={14} className="shrink-0 sm:size-[15px]" />
                Fast Delivery
              </span>

              <span className="flex items-center gap-1.5 whitespace-nowrap sm:gap-2">
                <ShieldCheck size={14} className="shrink-0 sm:size-[15px]" />
                Secure Payment
              </span>

              <span className="flex items-center gap-1.5 whitespace-nowrap sm:gap-2">
                <RefreshCcw size={14} className="shrink-0 sm:size-[15px]" />
                Easy Returns
              </span>
            </div>
          </DialogContent>
        </div>
      </div>
    </Dialog>
  );
};

export default QuickViewModal;
