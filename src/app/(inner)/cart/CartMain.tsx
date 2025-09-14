"use client";

import React from "react";
import { useCart } from "@/components/header/CartContext";

const CartMain: React.FC = () => {
  const {
    activeCartItems,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    isCartLoaded,
    coupon,
    discount,
    couponMessage,
    applyCoupon,
    setCoupon,
    setCouponMessage,
    subtotal,
    finalTotal,
    FREE_SHIPPING_THRESHOLD,
  } = useCart();

  if (!isCartLoaded) {
    return (
      <div className="rts-cart-area rts-section-gap bg_light-1">
        <div className="container py-5 text-center">Loading cart...</div>
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    applyCoupon(coupon);
  };

  const handleCouponInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(e.target.value);
    setCouponMessage("");
  };

  const progressPercentage = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100
  );

  return (
    <div className="rts-cart-area rts-section-gap bg_light-1">
      <div className="container">
        <div className="row g-5">
          <div className="col-xl-9 col-12 order-2 order-xl-1">
            <div className="cart-area-main-wrapper">
              <div className="cart-top-area-note">
                <p>
                  Add <span>₹ {FREE_SHIPPING_THRESHOLD}</span> to cart and get
                  free shipping
                </p>
                <div className="bottom-content-deals mt--10">
                  <div className="single-progress-area-incard">
                    <div className="progress">
                      <div
                        className="progress-bar wow fadeInLeft"
                        role="progressbar"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rts-cart-list-area">
              <div className="single-cart-area-list head d-flex">
                <div className="product-main" style={{ flex: 3 }}>
                  <p>Products</p>
                </div>
                <div className="price" style={{ flex: 1 }}>
                  <p>Price</p>
                </div>
                <div className="quantity" style={{ flex: 1 }}>
                  <p>Quantity</p>
                </div>
                <div className="subtotal" style={{ flex: 1 }}>
                  <p>SubTotal</p>
                </div>
              </div>

              {activeCartItems.length === 0 ? (
                <div className="empty-cart-message text-center py-5">
                  <h4>Your cart is empty</h4>
                  <p>Add some products to get started!</p>
                  <a href="/shop" className="rts-btn btn-primary mt-3">
                    Continue Shopping
                  </a>
                </div>
              ) : (
                activeCartItems.map((item) => (
                  <div
                    className="single-cart-area-list main item-parent d-flex align-items-center"
                    key={`${item.id}-${item.selectedColor || ""}-${
                      item.selectedSize || ""
                    }`}
                  >
                    <div
                      className="product-main-cart"
                      style={{ flex: 3, display: "flex", alignItems: "center" }}
                    >
                      <div
                        className="close section-activation"
                        onClick={() =>
                          removeFromCart(item.productId ?? item.id)
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            removeFromCart(item.productId ?? item.id);
                          }
                        }}
                        style={{ marginRight: 12, cursor: "pointer" }}
                      >
                        <i className="fa-regular fa-x" />
                      </div>
                      <div
                        className="thumbnail"
                        style={{ width: 80, marginRight: 12 }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                      <div className="information">
                        <h6 className="title">{item.title}</h6>
                        <div className="product-details">
                          <span>SKU: SKUZNFER</span>
                          {/* variants if present */}
                          {/** @ts-ignore */}
                          {item.selectedColor && (
                            <span className="ms-2">
                              Color: {item.selectedColor}
                            </span>
                          )}
                          {/** @ts-ignore */}
                          {item.selectedSize && (
                            <span className="ms-2">
                              Size: {item.selectedSize}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="price" style={{ flex: 1 }}>
                      <p>₹ {item.price.toFixed(2)}</p>
                    </div>

                    <div className="quantity" style={{ flex: 1 }}>
                      <div className="quantity-edit d-flex align-items-center">
                        <input
                          type="number"
                          className="input"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQuantity = Math.max(
                              1,
                              parseInt(e.target.value) || 1
                            );
                            updateItemQuantity(
                              item.productId ?? item.id,
                              newQuantity
                            );
                          }}
                          min={1}
                          style={{ width: 70, marginRight: 8 }}
                        />
                        <div className="button-wrapper-action d-flex flex-column">
                          <button
                            className="button minus"
                            onClick={() =>
                              item.quantity > 1 &&
                              updateItemQuantity(
                                item.productId ?? item.id,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            <i className="fa-regular fa-chevron-down" />
                          </button>
                          <button
                            className="button plus"
                            onClick={() =>
                              updateItemQuantity(
                                item.productId ?? item.id,
                                item.quantity + 1
                              )
                            }
                          >
                            <i className="fa-regular fa-chevron-up" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="subtotal" style={{ flex: 1 }}>
                      <p>₹ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}

              {/* Coupon + Clear */}
              <div className="bottom-cupon-code-cart-area mt-4 d-flex align-items-center">
                <form
                  onSubmit={handleApplyCoupon}
                  style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                  <input
                    type="text"
                    placeholder="Coupon Code (try: 12345, SAVE10, WELCOME20)"
                    value={coupon}
                    onChange={handleCouponInputChange}
                  />
                  <button
                    type="submit"
                    className="rts-btn btn-primary"
                    disabled={!coupon.trim()}
                  >
                    Apply Coupon
                  </button>
                </form>

                {couponMessage && (
                  <p
                    style={{
                      color: discount > 0 ? "green" : "red",
                      marginTop: 8,
                      fontWeight: 500,
                    }}
                  >
                    {couponMessage}
                  </p>
                )}

                <button
                  onClick={clearCart}
                  className="rts-btn btn-primary ms-3"
                  disabled={activeCartItems.length === 0}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="col-xl-3 col-12 order-1 order-xl-2">
            <div className="cart-total-area-start-right p-3 border rounded">
              <h5 className="title">Cart Totals</h5>

              <div className="subtotal d-flex justify-content-between">
                <span>Subtotal</span>
                <h6 className="price">₹ {subtotal.toFixed(2)}</h6>
              </div>

              {discount > 0 && (
                <div className="discount d-flex justify-content-between">
                  <span>Discount ({Math.round(discount * 100)}%)</span>
                  <h6 className="price text-success">
                    -₹ {(subtotal * discount).toFixed(2)}
                  </h6>
                </div>
              )}

              <div className="shipping">
                <span>Shipping</span>
                <ul>
                  <li>
                    <input
                      type="radio"
                      id="f-option"
                      name="selector"
                      defaultChecked
                    />
                    <label htmlFor="f-option">
                      Free Shipping{" "}
                      {subtotal >= FREE_SHIPPING_THRESHOLD && "(Eligible)"}
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="s-option" name="selector" />
                    <label htmlFor="s-option">Flat Rate (₹50)</label>
                  </li>
                </ul>
              </div>

              <div className="bottom mt-3">
                <div className="wrapper d-flex justify-content-between">
                  <span>Total</span>
                  <h6 className="price">₹ {finalTotal.toFixed(2)}</h6>
                </div>
                <div className="button-area mt-3">
                  <button
                    className="rts-btn btn-primary w-100"
                    disabled={activeCartItems.length === 0}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMain;
