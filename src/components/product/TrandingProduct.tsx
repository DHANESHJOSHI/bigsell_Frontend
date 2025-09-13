"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useGetTrendingProductsQuery, IProducts } from "@/store/productApi";

interface TrendingProductProps {
  limit?: number;
}

function TrandingProduct({ limit = 8 }: TrendingProductProps) {
  // Fetch trending products from API
  const {
    data: trendingProducts = [],
    isLoading,
    error,
  } = useGetTrendingProductsQuery(limit);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="top-tranding-product rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="title-left mb--10">Top Trending Products</h2>
              <p>Loading trending products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="top-tranding-product rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="title-left mb--10">Top Trending Products</h2>
              <p>Error loading trending products. Please try again later.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle empty state
  if (trendingProducts.length === 0) {
    return (
      <div className="top-tranding-product rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="title-left mb--10">Top Trending Products</h2>
              <p>No trending products available at the moment.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <>
        {/* rts top tranding product area */}
        <div className="top-tranding-product rts-section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-area-between">
                  <h2 className="title-left mb--10">Top Trending Products</h2>
                  <Link
                    href="/shop?filter=trending"
                    className="btn btn-outline-primary"
                  >
                    View All Trending
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="cover-card-main-over">
                  <div className="row g-4">
                    {trendingProducts.map(
                      (product: IProducts, index: number) => (
                        <div
                          key={product._id || index}
                          className="col-xl-3 col-md-6 col-sm-12 col-6"
                        >
                          <div className="single-shopping-card-one tranding-product">
                            <Link
                              href={`/shop/${product._id}`}
                              className="thumbnail-preview"
                            >
                              {product.discount && product.discount > 0 && (
                                <div className="badge">
                                  <span>
                                    {product.discount}
                                    {/* {product.discountType === "percentage" ? "%" : "₹"} <br />
                                  Off */}
                                  </span>
                                  <i className="fa-solid fa-bookmark" />
                                </div>
                              )}
                              <div
                                style={{
                                  width: "100%",
                                  height: "100px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Image
                                  src={
                                    product.thumbnail ||
                                    product.images?.[0] ||
                                    "/assets/images/grocery/default.jpg"
                                  }
                                  alt={product.name}
                                  width={100}
                                  height={100}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                />
                              </div>
                            </Link>
                            <div className="body-content">
                              <Link href={`/shop/${product._id}`}>
                                <h4 className="title">{product.name}</h4>
                              </Link>
                              <span className="availability">
                                {product.brand ||
                                  product.subcategory ||
                                  "Available"}
                                {product.weight && ` - ${product.weight}g`}
                              </span>
                              <div className="price-area">
                                <span className="current">
                                  ₹ {product.price.toFixed(2)}
                                </span>
                                {product.originalPrice &&
                                  product.originalPrice > product.price && (
                                    <div className="previous">
                                      ₹ {product.originalPrice.toFixed(2)}
                                    </div>
                                  )}
                              </div>
                              {product.rating && (
                                <div className="rating-area">
                                  <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                      <i
                                        key={i}
                                        className={`fa-solid fa-star ${
                                          i < Math.floor(product.rating || 0)
                                            ? "active"
                                            : ""
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="rating-count">
                                    {product.rating.toFixed(1)} (
                                    {product.reviewCount || 0})
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* rts top tranding product area end */}
      </>
    </div>
  );
}

export default TrandingProduct;
