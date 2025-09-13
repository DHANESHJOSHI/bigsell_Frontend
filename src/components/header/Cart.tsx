"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./CartContext";

type AnyObj = { [k: string]: any };

const sanitizeNumber = (v: any) => {
  // If already a number and finite, return it
  if (typeof v === "number" && isFinite(v)) return v;

  if (v == null) return 0; // null/undefined -> 0

  // If value is an object with amount, try that
  if (typeof v === "object") {
    if (typeof v.amount !== "undefined") v = v.amount;
    else return 0;
  }

  // Convert to string, remove currency symbols, commas, spaces, non-digit except dot/minus
  const s = String(v)
    .trim()
    .replace(/[,₹\s]/g, "")
    .replace(/[^\d.-]/g, "");
  const n = Number(s);

  return isFinite(n) ? n : 0;
};

const CartDropdown: React.FC = () => {
  const { cartItems, removeFromCart, isCartLoaded } = useCart();

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  // If items may not have `active`, treat undefined as true (adjust to your business rule)
  const activeItems = safeCartItems.filter((item: AnyObj) =>
    typeof item.active === "undefined" ? true : !!item.active
  );

  const total = activeItems.reduce((sum: number, item: AnyObj) => {
    const price = sanitizeNumber(item.price);
    const qty = Math.max(0, Math.floor(sanitizeNumber(item.quantity) || 0));
    return sum + price * qty;
  }, 0);
  const freeShippingThreshold = 125;
  const remaining = Math.max(0, freeShippingThreshold - total);

  if (!isCartLoaded) {
    return (
      <div className="btn-border-only cart category-hover-header">
        <i className="fa-sharp fa-regular fa-cart-shopping" />
        <span className="text">Cart</span>
        <span className="number">0</span>
      </div>
    );
  }

  return (
    <div className="btn-border-only cart category-hover-header">
      <i className="fa-sharp fa-regular fa-cart-shopping" />
      <span className="text">Cart</span>
      <span className="number">{activeItems.length}</span>

      <div className="category-sub-menu card-number-show">
        <h5 className="shopping-cart-number">
          Shopping Cart ({activeItems.length.toString().padStart(2, "0")})
        </h5>

        {activeItems.map((item: AnyObj) => {
          const price = sanitizeNumber(item.price);
          const qty = Math.max(
            0,
            Math.floor(sanitizeNumber(item.quantity) || 0)
          );
          const lineTotal = price * qty;
          console.log(lineTotal, price);

          return (
            <div key={item.id} className="cart-item-1 border-top">
              <div className="img-name">
                <div
                  className="close section-activation"
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className="fa-regular fa-x" />
                </div>
                <div className="thumbanil">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.title || "Product"}
                    width={60}
                    height={60}
                  />
                </div>
                <div className="details">
                  <Link href="/shop/details-profitable-business-makes-your-profit">
                    <h5 className="title">{item.title}</h5>
                  </Link>
                  <div className="number">
                    {qty} <i className="fa-regular fa-x" />
                    <span> ₹ {lineTotal.toFixed(2)} </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="sub-total-cart-balance">
          <div className="bottom-content-deals mt--10">
            <div className="top">
              <span>Sub Total:</span>
              <span className="number-c">₹ {total.toFixed(2)}</span>
            </div>
            <div className="single-progress-area-incard">
              <div className="progress">
                <div
                  className="progress-bar wow fadeInLeft"
                  role="progressbar"
                  style={{
                    width: `${Math.min(
                      (total / freeShippingThreshold) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
            {total < freeShippingThreshold && (
              <p>
                Spend More <span>₹ {remaining.toFixed(2)}</span> to reach{" "}
                <span>Free Shipping</span>
              </p>
            )}
          </div>

          <div className="button-wrapper d-flex align-items-center justify-content-between">
            <a href="/cart" className="rts-btn btn-primary">
              View Cart
            </a>
            <a href="/checkout" className="rts-btn btn-primary border-only">
              CheckOut
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
