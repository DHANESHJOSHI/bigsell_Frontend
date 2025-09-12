"use client";
import React, { useEffect } from "react";
import DiscountProductMain from "@/components/product-main/DiscountProductMain";
import { useGetDiscountProductsQuery, IProducts } from "@/store/productApi";
import Link from "next/link";
interface PostType {
  category?: string;
  slug: string;
  image: string;
  title?: string;
  author?: string;
  publishedDate?: string;
  price?: string;
  del?: string;
  material?: string;
}

function DiscountProduct() {
  // Fetch discount products from API
  const { data: discountProducts = [], isLoading, error } = useGetDiscountProductsQuery();

  // Transform API products to PostType format
  const transformProductToPost = (product: IProducts): PostType => {
    // Handle specifications - can be array or object
    let material = product.brand || "";
    if (product.specifications) {
      if (Array.isArray(product.specifications)) {
        const materialSpec = product.specifications.find(spec => spec.key.toLowerCase() === 'material');
        material = materialSpec?.value || product.brand || "";
      } else if (typeof product.specifications === 'object') {
        material = (product.specifications as any).Material || product.brand || "";
      }
    }

    return {
      slug: product.slug || product.name?.toLowerCase().replace(/\s+/g, "-") || "",
      image: product.thumbnail || product.images?.[0] || "",
      title: product.name || "",
      price: product.price?.toString() || "0",
      del: product.originalPrice?.toString() || "",
      material,
      category: typeof product.category === "object" ? product.category?.title : product.category,
    };
  };

  const selectedPosts = discountProducts.slice(0, 10).map(transformProductToPost);

  // Create sections from available products (repeat products if needed)
  const createSection = (count: number) => {
    const section = [];
    for (let i = 0; i < count; i++) {
      section.push(selectedPosts[i % selectedPosts.length]);
    }
    return section.filter(Boolean);
  };

  const getPostsByIndices = (indices: number[]): PostType[] => createSection(indices.length);

  // Define section sizes
  const postIndicesSection1 = [0, 1, 2, 3];
  const postIndicesSection2 = [5, 6, 4, 7, 8, 5, 6, 5, 8, 9, 10, 11];
  const postIndicesSection3 = [5, 6, 8, 7, 3, 2, 1, 5, 8, 9, 10, 2];
  const postIndicesSection4 = [1, 2, 6, 7, 8, 2, 1, 5, 8, 9, 10, 11];

  // Prepare post groups
  const postsSection1 = getPostsByIndices(postIndicesSection1);
  const postsSection2 = getPostsByIndices(postIndicesSection2);
  const postsSection3 = getPostsByIndices(postIndicesSection3);
  const postsSection4 = getPostsByIndices(postIndicesSection4);

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="rts-grocery-feature-area rts-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <p>Loading discount products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rts-grocery-feature-area rts-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <p>Error loading discount products. Please try again later.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* rts grocery feature area start */}
      <div className="rts-grocery-feature-area rts-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-area-between">
                <h2 className="title-left">Products With Discounts</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="product-with-discount">
                <div className="row g-5">
                  <div className="col-xl-4 col-lg-12">
                    <Link
                      href="shop-details.html"
                      className="single-discount-with-bg"
                    >
                      <div className="inner-content">
                        <h4 className="title" style={{ color: "#000" }}>
                          New Arrivals Fashion <br /> Seasonal Collection
                        </h4>
                        <div className="price-area">
                          <h4 className="title" style={{ color: "#1b3f76" }}>
                            Up to 75% Off
                          </h4>
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="shop-details.html"
                      className="single-discount-with-bg bg-2"
                    >
                      <div className="inner-content text-end">
                        <h2 className="title " style={{ color: "#000" }}>
                          New Arrivals Fashion Seasonal Collection
                        </h2>
                        <div className="price-area">
                          <h4 className="title" style={{ color: "#1b3f76" }}>
                            Up to 75% Off
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-xl-8 col-lg-12">
                    <div className="row g-4">
                      {postsSection1.map((post: PostType, index: number) => (
                        <div key={index} className="col-lg-6 col-6">
                          <div className="single-shopping-card-one discount-offer">
                            <DiscountProductMain
                              Slug={post.slug}
                              ProductImage={post.image}
                              ProductTitle={post.title}
                              Price={post.price}
                              del={post.del}
                              material={post.material}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* rts grocery feature area end */}
    </div>
  );
}

export default DiscountProduct;
