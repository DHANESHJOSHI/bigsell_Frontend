"use client";
import { useState } from "react";
import WeeklyBestSellingMain from "@/components/product-main/WeeklyBestSellingMain";
import Product from "@/data/bestSellingProduct.json";

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

const WeeklyBestSelling: React.FC = () => {
  // tab
  const [activeTab, setActiveTab] = useState<string>("tab1");

  // modal
  type ModalType = "one" | "two" | "three" | null;
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const handleClose = () => setActiveModal(null);

  // product content
  const selectedPosts = Product.slice(1, 11);

  const postIndicesSection1 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  ];

  // Helper function to get posts from indices
  const getPostsByIndices = (indices: number[]): PostType[] =>
    indices.map((index) => Product[index]).filter(Boolean);

  // Prepare post groups
  const postsSection1 = getPostsByIndices(postIndicesSection1);

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
                    {postsSection1.map((post: PostType, index: number) => (
                      <div
                        key={index}
                        className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6"
                      >
                        <div className="single-shopping-card-one">
                          <WeeklyBestSellingMain
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
        {/* best selling groceris end */}
      </>
    </div>
  );
};

export default WeeklyBestSelling;
