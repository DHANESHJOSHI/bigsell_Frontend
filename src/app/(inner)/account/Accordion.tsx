// components/account/AccountTabs.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const API =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/v1/api";

const AccountTabs = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("track");

  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<{ billing: any; shipping: any }>({
    billing: null,
    shipping: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAuthHeaders = (token: string) => ({
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
      return;
    }

    let cancelled = false;

    const fetchAll = async () => {
      setLoading(true);
      setError("");

      try {
        console.log("[AccountTabs] API:", API);
        console.log("[AccountTabs] token:", token?.slice(0, 20) + "...");

        // --- USER PROFILE ---
        let userData: any = null;
        try {
          const res = await axios.get(`${API}/auth/me`, getAuthHeaders(token));
          userData = res.data;
        } catch (uErr: any) {
          console.error(
            "[AccountTabs] /auth/me error:",
            uErr?.response?.status,
            uErr?.config?.url,
            uErr?.response?.data
          );
          throw uErr; // rethrow so outer catch handles 401/403
        }

        // --- ORDERS ---
        let ordersData: any = null;
        try {
          const resOrders = await axios.get(
            `${API}/orders/my-orders`,
            getAuthHeaders(token)
          );
          ordersData = resOrders.data;
        } catch (oErr: any) {
          console.error(
            "[AccountTabs] /orders/my-orders error:",
            oErr?.response?.status,
            oErr?.config?.url,
            oErr?.response?.data
          );
          if (oErr?.response?.status === 404) {
            // fallback try `/orders`
            try {
              const resOrders2 = await axios.get(
                `${API}/orders`,
                getAuthHeaders(token)
              );
              ordersData = resOrders2.data;
            } catch (fallbackErr: any) {
              console.error(
                "[AccountTabs] fallback /orders also failed:",
                fallbackErr?.response?.status,
                fallbackErr?.config?.url
              );
              setError("Orders endpoint not found. Check backend routes.");
            }
          } else {
            throw oErr;
          }
        }

        if (cancelled) return;

        setUser(userData?.user || userData);
        setOrders(
          Array.isArray(ordersData?.orders)
            ? ordersData.orders
            : ordersData || []
        );

        // addresses
        if (userData?.user?.billing || userData?.user?.shipping) {
          setAddresses({
            billing: userData.user.billing || null,
            shipping: userData.user.shipping || null,
          });
        }
      } catch (err: any) {
        console.error("Account fetch outer error:", err);
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem("authToken");
          router.push("/login");
          return;
        }
        setError(
          err?.response?.data?.message || "Failed to load account data."
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="account-tab-area-start rts-section-gap">
        <div className="container-2">
          <div>Loading account…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-tab-area-start rts-section-gap">
      <div className="container-2">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3">
            <div className="nav accout-dashborard-nav flex-column nav-pills me-3">
              <button
                className={`nav-link ${
                  activeTab === "dashboard" ? "active" : ""
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <i className="fa-regular fa-chart-line"></i> Dashboard
              </button>
              <button
                className={`nav-link ${activeTab === "order" ? "active" : ""}`}
                onClick={() => setActiveTab("order")}
              >
                <i className="fa-regular fa-bag-shopping"></i> Order
              </button>
              <button
                className={`nav-link ${activeTab === "track" ? "active" : ""}`}
                onClick={() => setActiveTab("track")}
              >
                <i className="fa-regular fa-tractor"></i> Track Your Order
              </button>
              <button
                className={`nav-link ${
                  activeTab === "address" ? "active" : ""
                }`}
                onClick={() => setActiveTab("address")}
              >
                <i className="fa-regular fa-location-dot"></i> My Address
              </button>
              <button
                className={`nav-link ${
                  activeTab === "account" ? "active" : ""
                }`}
                onClick={() => setActiveTab("account")}
              >
                <i className="fa-regular fa-user"></i> Account Details
              </button>
              <button className="nav-link" onClick={handleLogout}>
                <i className="fa-light fa-right-from-bracket" /> Log Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="col-lg-9 pl--50 pl_md--10 pl_sm--10 pt_md--30 pt_sm--30">
            <div className="tab-content">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {activeTab === "dashboard" && (
                <div className="dashboard-account-area">
                  <h2 className="title">
                    Hello {user?.firstName || user?.name || "Customer"}!{" "}
                    <a href="#" onClick={handleLogout}>
                      Log Out.
                    </a>
                  </h2>
                  <p className="disc">
                    From your account dashboard you can view your recent orders,
                    manage your shipping and billing addresses, and edit your
                    password and account details.
                  </p>
                </div>
              )}

              {activeTab === "order" && (
                <div className="order-table-account">
                  <div className="h2 title">Your Orders</div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Total</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders && orders.length > 0 ? (
                          orders.map((o) => (
                            <tr key={o._id || o.id}>
                              <td>{o.orderNumber || `#${o._id?.slice(-6)}`}</td>
                              <td>
                                {o.createdAt
                                  ? new Date(o.createdAt).toLocaleDateString()
                                  : "-"}
                              </td>
                              <td>{o.status}</td>
                              <td>
                                {o.total
                                  ? `₹ ${o.total} for ${
                                      o.items?.length || 0
                                    } item(s)`
                                  : "-"}
                              </td>
                              <td>
                                <Link
                                  href={`/orders/${o._id}`}
                                  className="btn-small d-block"
                                >
                                  View
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5}>No orders found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTabs;
