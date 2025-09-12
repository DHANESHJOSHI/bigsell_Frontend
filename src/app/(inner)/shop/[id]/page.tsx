"use client";

import React, { useEffect, useMemo, useState } from "react";
import HeaderOne from "@/components/header/HeaderOne";
import ShortService from "@/components/service/ShortService";
import FooterOne from "@/components/footer/FooterOne";
import { useParams } from "next/navigation";

import { useCart } from "@/components/header/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FeatureProduct from "@/components/product/FeatureProduct";

//  Import RTK Query hook
import { useGetProductByIdQuery } from "@/store/productApi";

/* -------------------- ColorSwatch (isolated, accessible) -------------------- */
const ColorSwatch: React.FC<{
  color: string;
  selected: boolean;
  onSelect: () => void;
  label?: string;
}> = ({ color, selected, onSelect, label }) => {
  const isLightColor = React.useMemo(() => {
    if (!color) return false;
    const lc = color.toLowerCase().trim();
    if (/(white|ivory|beige|cream|linen)/.test(lc)) return true;
    if (/^#([fF]{3}|[fF]{6})$/.test(lc)) return true;
    // basic check for rgb/rgba if you want to expand later
    return false;
  }, [color]);

  const outerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    padding: 4,
    borderRadius: 6,
    userSelect: "none",
  };

  const boxStyle: React.CSSProperties = {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: color,
    boxSizing: "border-box",
    border: isLightColor
      ? "1px solid rgba(0,0,0,0.28)"
      : "1px solid rgba(0,0,0,0.08)",
    outline: selected ? "3px solid rgba(37,99,235,0.18)" : undefined,
    boxShadow: selected ? "0 0 0 1px rgba(37,99,235,0.45) inset" : undefined,
    flexShrink: 0,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    color: "#111",
    background: "transparent",
    padding: "2px 6px",
    borderRadius: 6,
    border: "none",
  };

  return (
    <div
      role="button"
      onClick={(e) => {
        e.preventDefault();
        onSelect();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      tabIndex={0}
      aria-pressed={selected}
      title={label ?? color}
      style={outerStyle}
    >
      <span style={boxStyle} />
      <span style={labelStyle}>{label}</span>
    </div>
  );
};

/* -------------------- Main Component -------------------- */
const CompareElements: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery((id as string) ?? "", { skip: !id });

  useEffect(() => {
    if (!product) return;

    if (product.thumbnail) setActiveImage(product.thumbnail);
    else if (product.images && product.images.length > 0)
      setActiveImage(product.images[0]);
    else setActiveImage(null);

    if (product.colors && product.colors.length > 0) {
      setSelectedColor((prev) => prev ?? String(product.colors![0]));
    } else setSelectedColor(null);

    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize((prev) => prev ?? String(product.sizes![0]));
    } else setSelectedSize(null);

    if (typeof product.stock === "number" && product.stock < quantity) {
      setQuantity(Math.max(1, product.stock));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const thumbnails = useMemo(
    () =>
      (product?.images ?? []).map((img, idx) => ({
        id: `${idx}`,
        src: img,
        alt: product?.name ?? "product",
      })),
    [product?.images, product?.name]
  );

  const specifications = useMemo((): { key: string; value: string }[] => {
    if (!product) return [];
    if (Array.isArray((product as any).specifications)) {
      return (product as any).specifications.map((s: any) => ({
        key: String(s.key ?? ""),
        value: String(s.value ?? ""),
      }));
    }
    if (product.specifications && typeof product.specifications === "object") {
      return Object.entries(product.specifications).map(([k, v]) => ({
        key: k,
        value: String(v ?? ""),
      }));
    }
    return [];
  }, [product]);

  if (isLoading) return <div>Loading product details...</div>;
  if (isError || !product) return <div>Product not found!</div>;

  const handleAdd = () => {
    if (typeof product.stock === "number" && quantity > product.stock) {
      toast.error("Requested quantity exceeds available stock.");
      return;
    }

    addToCart({
      id: product._id ?? `${Date.now()}`,
      image: activeImage ?? product.thumbnail ?? product.images?.[0] ?? "",
      title: product.name ?? "Product",
      price: product.price ?? 0,
      quantity,
      active: true,
      meta: {
        color: selectedColor,
        size: selectedSize,
        sku: product.sku,
        vendor: product.vendor,
      },
    } as any);

    setAdded(true);
    toast.success("Successfully added to cart!");
    setTimeout(() => setAdded(false), 4000);
  };

  const increment = () =>
    setQuantity((q) =>
      typeof product.stock === "number" ? Math.min(q + 1, product.stock) : q + 1
    );
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div>
      <HeaderOne />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <a href="/">Home</a>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="#">
                  {product.name}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="rts-chop-details-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="shopdetails-style-1-wrapper">
            <div className="row g-5">
              <div className="col-xl-8 col-lg-8 col-md-12">
                <div className="product-details-popup-wrapper in-shopdetails">
                  <div className="rts-product-details-section rts-product-details-section2 product-details-popup-section">
                    <div className="product-details-popup">
                      <div className="details-product-area">
                        {/* Product Image */}
                        <div className="product-thumb-area">
                          <div className="cursor" />
                          <div className="thumb-wrapper one filterd-items figure">
                            <div
                              className="product-thumb"
                              style={{
                                cursor: "pointer",
                                width: "100%",
                                height: "300px",
                              }}
                            >
                              <img
                                src={
                                  activeImage ??
                                  product.thumbnail ??
                                  "/assets/placeholder.png"
                                }
                                alt={product.name ?? "product"}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src =
                                    "/assets/placeholder.png";
                                }}
                              />
                            </div>
                          </div>

                          {/* Thumbnails */}
                          <div
                            className="product-thumb-filter-group"
                            style={{ marginTop: 12 }}
                          >
                            {thumbnails.map((thumb) => (
                              <div
                                key={thumb.id}
                                className={`thumb-filter filter-btn ${
                                  activeImage === thumb.src ? "active" : ""
                                }`}
                                onClick={() => setActiveImage(thumb.src)}
                                style={{
                                  cursor: "pointer",
                                  display: "inline-block",
                                  marginRight: 8,
                                }}
                              >
                                <img
                                  src={thumb.src}
                                  alt={thumb.alt}
                                  style={{
                                    width: 56,
                                    height: 56,
                                    objectFit: "cover",
                                  }}
                                  onError={(e) =>
                                    ((e.currentTarget as HTMLImageElement).src =
                                      "/assets/placeholder.png")
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Product Content */}
                        <div className="contents">
                          <div className="product-status">
                            <span
                              className="product-catagory"
                              style={{ display: "inline-block" }}
                            >
                              {typeof product.category === "object" && product.category?.title
                                ? product.category.title
                                : typeof product.category === "string"
                                ? product.category
                                : "General"}
                            </span>
                          </div>
                          <h2 className="product-title">{product.name}</h2>
                          <p className="mt--20 mb--20">
                            {product.shortDescription ||
                              "No description available"}
                          </p>

                          <span
                            className="product-price mb--15 d-block"
                            style={{ color: "#DC2626", fontWeight: 600 }}
                          >
                            ₹ {product.price}
                            {product.originalPrice && (
                              <span
                                className="old-price ml--15"
                                style={{ marginLeft: 12 }}
                              >
                                ₹ {product.originalPrice}
                              </span>
                            )}
                          </span>

                          {/* Options: Colors */}
                          {product.colors && product.colors.length > 0 && (
                            <div
                              className="product-option mb--15"
                              style={{ marginTop: 8 }}
                            >
                              <strong
                                style={{ display: "block", marginBottom: 8 }}
                              >
                                Color:
                              </strong>

                              <div
                                className="tw-color-row"
                                style={{
                                  display: "flex",
                                  gap: 12,
                                  alignItems: "center",
                                  flexWrap: "wrap", // will wrap only if needed
                                }}
                              >
                                {product.colors.map((c: any) => (
                                  <ColorSwatch
                                    key={String(c)}
                                    color={String(c)}
                                    selected={selectedColor === String(c)}
                                    onSelect={() => setSelectedColor(String(c))}
                                    label={String(c)}
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Options: Sizes */}
                          {product.sizes && product.sizes.length > 0 && (
                            <div
                              className="product-option mb--15"
                              style={{ marginTop: 8 }}
                            >
                              <strong
                                style={{ display: "block", marginBottom: 8 }}
                              >
                                Size:
                              </strong>
                              <div
                                style={{
                                  display: "flex",
                                  gap: 10,
                                  flexWrap: "wrap",
                                }}
                              >
                                {product.sizes.map((s: any) => (
                                  <button
                                    key={String(s)}
                                    onClick={() => setSelectedSize(String(s))}
                                    className="tw-size-pill"
                                    style={{
                                      padding: "6px 10px",
                                      borderRadius: 8,
                                      border:
                                        selectedSize === String(s)
                                          ? "1px solid rgba(0,0,0,0.85)"
                                          : "1px solid rgba(0,0,0,0.08)",
                                      background:
                                        selectedSize === String(s)
                                          ? "#111"
                                          : "transparent",
                                      color:
                                        selectedSize === String(s)
                                          ? "#fff"
                                          : "#111",
                                      cursor: "pointer",
                                      fontSize: 13,
                                    }}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Quantity + Add to Cart */}
                          <div className="product-bottom-action d-flex align-items-center gap-3 mt-3">
                            <div
                              className="quantity-controls d-flex align-items-center"
                              style={{ gap: 8 }}
                            >
                              <button
                                onClick={decrement}
                                className="rts-btn btn-sm bg-color-black radious-sm"
                                style={{ padding: "6px 10px" }}
                              >
                                -
                              </button>
                              <input
                                value={quantity}
                                onChange={(e) =>
                                  setQuantity(
                                    Math.max(1, Number(e.target.value) || 1)
                                  )
                                }
                                style={{
                                  width: 60,
                                  textAlign: "center",
                                  margin: "0 8px",
                                }}
                                type="number"
                              />
                              <button
                                onClick={increment}
                                className="rts-btn btn-sm bg-color-black radious-sm"
                                style={{ padding: "6px 10px" }}
                              >
                                +
                              </button>
                            </div>

                            <a
                              href="#"
                              className="rts-btn btn-primary radious-sm with-icon"
                              onClick={(e) => {
                                e.preventDefault();
                                handleAdd();
                              }}
                              aria-disabled={added}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                              }}
                            >
                              <div className="btn-text">Add to Cart</div>
                              <div className="arrow-icon">
                                <i className="fa-regular fa-cart-shopping" />
                              </div>
                            </a>
                          </div>

                          <div
                            className="product-uniques mt-3"
                            style={{ marginTop: 18 }}
                          >
                            <div>
                              <span className="sku product-unipue mb--10">
                                <strong>SKU:</strong> {product.sku || "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="tags product-unipue mb--10">
                                <strong>Brand:</strong> {product.brand || "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="tags product-unipue mb--10">
                                <strong>Status:</strong> {product.status}
                              </span>
                            </div>
                            <div>
                              <strong>Stock:</strong>{" "}
                              {typeof product.stock === "number"
                                ? product.stock
                                : "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="product-discription-tab-shop mt--50">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab("tab1")}
                        className={`nav-link ${
                          activeTab === "tab1" ? "active" : ""
                        }`}
                      >
                        Product Details
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab("tab2")}
                        className={`nav-link ${
                          activeTab === "tab2" ? "active" : ""
                        }`}
                      >
                        Additional Information
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    {activeTab === "tab1" && (
                      <div className="single-tab-content-shop-details">
                        <p className="disc">{product.description}</p>
                      </div>
                    )}
                    {activeTab === "tab2" && (
                      <div className="single-tab-content-shop-details">
                        <p className="disc">
                          Features:{" "}
                          {Array.isArray(product.features)
                            ? product.features.join(", ")
                            : "N/A"}
                        </p>
                        <p>
                          Dimensions: {product.dimensions?.length ?? "N/A"} x{" "}
                          {product.dimensions?.width ?? "N/A"} x{" "}
                          {product.dimensions?.height ?? "N/A"} cm
                        </p>

                        {specifications.length > 0 && (
                          <div className="specifications mt-3">
                            <h6>Specifications</h6>
                            <ul>
                              {specifications.map((s) => (
                                <li key={s.key}>
                                  <strong>{s.key}:</strong> {s.value}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-xl-3 col-lg-4 col-md-12 offset-xl-1  rts-sticky-column-item">
                <div className="theiaStickySidebar">
                  <div className="shop-sight-sticky-sidevbar mb--20">
                    <h6 className="title">Available offers</h6>
                    <div className="single-offer-area">
                      <div className="details">
                        <p>Get 5% instant discount using Big Sell UPI</p>
                      </div>
                    </div>
                  </div>
                  <div className="our-payment-method">
                    <h5 className="title">Guaranteed Safe Checkout</h5>
                    <img
                      src="/assets/images/shop/03.png"
                      alt=""
                      onError={(e) =>
                        ((e.currentTarget as HTMLImageElement).src =
                          "/assets/placeholder.png")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FeatureProduct />
      <ShortService />
      <FooterOne />
      <ToastContainer />
    </div>
  );
};

export default CompareElements;
