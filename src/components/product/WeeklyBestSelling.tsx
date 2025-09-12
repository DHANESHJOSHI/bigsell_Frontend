"use client";
import { useState } from "react";
import WeeklyBestSellingMain from "@/components/product-main/WeeklyBestSellingMain";
import { useGetWeeklyBestSellingProductsQuery, IProducts } from "@/store/productApi";

const WeeklyBestSelling: React.FC = () => {
  // API data
  const { data: weeklyBestSellingProducts = [], isLoading, error } = useGetWeeklyBestSellingProductsQuery();

  // tab
  const [activeTab, setActiveTab] = useState<string>("tab1");

  // modal
  type ModalType = "one" | "two" | "three" | null;
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const handleClose = () => setActiveModal(null);

  if (isLoading) {
    return (
      <div className="weekly-best-selling-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Loading Weekly Best Selling Products...</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weekly-best-selling-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Error loading weekly best selling products</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <>
        {/* best selling groceris */}
        <div className="weekly-best-selling-area rts-section-gap bg_light-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-area-between">
                  <h2 className="title-left">Weekly Best Selling Products</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div>
                  <div className="row g-4">
                    {weeklyBestSellingProducts.map((product: IProducts, index: number) => (
                      <div
                        key={product._id || index}
                        className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6"
                      >
                        <div className="single-shopping-card-one">
                          <WeeklyBestSellingMain
                            Slug={product.slug || product._id || `product-${index}`}
                            ProductImage={product.thumbnail || product.images?.[0] || ""}
                            ProductTitle={product.name}
                            Price={product.price ? `₹${product.price}` : ""}
                            del={product.originalPrice ? `₹${product.originalPrice}` : ""}
                            material={product.brand || ""}
                            productData={product}
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
        {/* best selling groceris end */}
      </>
    </div>
  );
};

export default WeeklyBestSelling;
