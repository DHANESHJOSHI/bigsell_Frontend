"use clients";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function TrandingProduct() {
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
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="cover-card-main-over">
                  <div className="row g-4">
                    <div className="col-xl-3 col-md-6 col-sm-12 col-6">
                      <div className="single-shopping-card-one tranding-product">
                        <Link href="/shop" className="thumbnail-preview">
                          <div className="badge">
                            <span>
                              25% <br />
                              Off
                            </span>
                            <i className="fa-solid fa-bookmark" />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "100px",
                            }}
                          >
                            <Image
                              src="/assets/images/grocery/07.jpg"
                              alt="grocery"
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
                          <Link href="/shop">
                            <h4 className="title">Pastine Mellin Filid</h4>
                          </Link>
                          <span className="availability">500g Pack</span>
                          <div className="price-area">
                            <span className="current">₹ 360.00</span>
                            <div className="previous">₹ 400.00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6 col-sm-12 col-6">
                      <div className="single-shopping-card-one tranding-product">
                        <Link href="/shop" className="thumbnail-preview">
                          <div className="badge">
                            <span>
                              25% <br />
                              Off
                            </span>
                            <i className="fa-solid fa-bookmark" />
                          </div>
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
                              src="/assets/images/grocery/1.jpg"
                              alt="grocery"
                              width={80}
                              height={80}
                              style={{
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        </Link>
                        <div className="body-content">
                          <Link href="/shop">
                            <h4 className="title">Titan Gents Watch</h4>
                          </Link>
                          <span className="availability"> 1 Pack</span>
                          <div className="price-area">
                            <span className="current">₹ 3600.00</span>
                            <div className="previous">₹ 4000.00</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6 col-sm-12 col-6">
                      <div className="single-shopping-card-one tranding-product">
                        <Link href="/shop" className="thumbnail-preview">
                          <div className="badge">
                            <span>
                              25% <br />
                              Off
                            </span>
                            <i className="fa-solid fa-bookmark" />
                          </div>
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
                              src="/assets/images/discount-product/2.jpg"
                              alt="grocery"
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
                          <Link href="/shop">
                            <h4 className="title">Campus Sport Shoes</h4>
                          </Link>
                          <span className="availability"> 1 Pack</span>
                          <div className="price-area">
                            <span className="current">₹ 200.00</span>
                            <div className="previous">₹ 500.00</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6 col-sm-12 col-6">
                      <div className="single-shopping-card-one tranding-product">
                        <Link href="/shop" className="thumbnail-preview">
                          <div className="badge">
                            <span>
                              25% <br />
                              Off
                            </span>
                            <i className="fa-solid fa-bookmark" />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "100px",
                            }}
                          >
                            <Image
                              src="/assets/images/grocery/01.jpg"
                              alt="grocery"
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
                          <Link href="/shop">
                            <h4 className="title">Pastine Mellin Filid</h4>
                          </Link>
                          <span className="availability">500g Pack</span>
                          <div className="price-area">
                            <span className="current">₹ 360.00</span>
                            <div className="previous">₹ 400.00</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6 col-sm-12 col-6">
                      <div className="single-shopping-card-one tranding-product">
                        <Link href="/shop" className="thumbnail-preview">
                          <div className="badge">
                            <span>
                              25% <br />
                              Off
                            </span>
                            <i className="fa-solid fa-bookmark" />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "100px",
                            }}
                          >
                            <Image
                              src="/assets/images/discount-product/5.webp"
                              alt="grocery"
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
                          <Link href="/shop">
                            <h4 className="title"> Shampoo pack of 200 ml</h4>
                          </Link>
                          <span className="availability"> 200 ml Pack</span>
                          <div className="price-area">
                            <span className="current">₹ 220.00</span>
                            <div className="previous">₹ 250.00</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6 col-sm-12 col-6">
                      <div className="single-shopping-card-one tranding-product">
                        <Link href="/shop" className="thumbnail-preview">
                          <div className="badge">
                            <span>
                              25% <br />
                              Off
                            </span>
                            <i className="fa-solid fa-bookmark" />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "100px",
                            }}
                          >
                            <Image
                              src="/assets/images/discount-product/4.jpg"
                              alt="grocery"
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
                          <Link href="/shop">
                            <h4 className="title"> Shampoo Head & Shoulder</h4>
                          </Link>
                          <span className="availability"> 200 ml Pack</span>
                          <div className="price-area">
                            <span className="current">₹ 320.00</span>
                            <div className="previous">₹ 350.00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6 col-sm-12 col-6">
                      <div className="single-shopping-card-one tranding-product">
                        <Link href="/shop" className="thumbnail-preview">
                          <div className="badge">
                            <span>
                              25% <br />
                              Off
                            </span>
                            <i className="fa-solid fa-bookmark" />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "100px",
                            }}
                          >
                            <Image
                              src="/assets/images/grocery/07.jpg"
                              alt="grocery"
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
                          <Link href="/shop">
                            <h4 className="title">Pastine Mellin Filid</h4>
                          </Link>
                          <span className="availability">500g Pack</span>
                          <div className="price-area">
                            <span className="current">₹ 360.00</span>
                            <div className="previous">₹ 400.00</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6 col-sm-12 col-6">
                      <div className="single-shopping-card-one tranding-product">
                        <Link href="/shop" className="thumbnail-preview">
                          <div className="badge">
                            <span>
                              25% <br />
                              Off
                            </span>
                            <i className="fa-solid fa-bookmark" />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "100px",
                            }}
                          >
                            <Image
                              src="/assets/images/discount-product/3.jpg"
                              alt="grocery"
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
                          <Link href="/shop">
                            <h4 className="title">Perfume for Men</h4>
                          </Link>
                          <span className="availability"> 200 ml Pack</span>
                          <div className="price-area">
                            <span className="current">₹ 520.00</span>
                            <div className="previous">₹ 850.00</div>
                          </div>
                        </div>
                      </div>
                    </div>
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
