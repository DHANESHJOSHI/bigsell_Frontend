"use client";
import React, { useState, useEffect, useRef } from "react";
import HeaderNav from "./HeaderNav";
import CategoryMenu from "./CategoryMenu";
import Cart from "./Cart";
import WishList from "./WishList";
import Sidebar from "./Sidebar";
import BackToTop from "@/components/common/BackToTop";
import { useCompare } from "@/components/header/CompareContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetGeneralSettingsQuery } from "@/store/generalSettings";

/**
 * HeaderOne - defensive & fixed:
 * - provide safe default generalSettings
 * - image fallback using onError
 * - valid SVG path for search icon (no "..." placeholder)
 * - autocomplete container positioned (form wrapper is relative)
 */

const DEFAULT_SETTINGS = {
  siteTitle: "BigSell",
  logo: "/assets/placeholder-logo.png",
  headerTab: "Welcome to BigSell",
  number: "0000000000",
};

function HeaderOne() {
  const {
    data: generalSettings,
    isLoading,
    isError,
  } = useGetGeneralSettingsQuery();

  // Always use a safe object so we never read properties of undefined
  const gs = {
    ...DEFAULT_SETTINGS,
    ...(generalSettings ?? {}),
  };

  const { compareItems } = useCompare();

  // Countdown setup (kept as-is but safe if DOM doesn't contain expected text)
  useEffect(() => {
    const countDownElements =
      Array.from(document.querySelectorAll<HTMLElement>(".countDown")) ?? [];
    const endDates: Date[] = [];

    countDownElements.forEach((el) => {
      const match = el.innerText.match(
        /([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/
      );
      if (!match) return;

      const end = new Date(
        +match[3],
        +match[1] - 1,
        +match[2],
        +match[4],
        +match[5],
        +match[6]
      );
      if (end > new Date()) {
        endDates.push(end);
        const next = calcTime(end.getTime() - new Date().getTime());
        el.innerHTML = renderDisplay(next);
      } else {
        el.innerHTML = `<p class="end">Sorry, your session has expired.</p>`;
      }
    });

    const interval = setInterval(() => {
      countDownElements.forEach((el, i) => {
        const end = endDates[i];
        if (!end) return;
        const now = new Date();
        const diff = end.getTime() - now.getTime();

        if (diff <= 0) {
          el.innerHTML = `<p class="end">Sorry, your session has expired.</p>`;
        } else {
          const next = calcTime(diff);
          el.innerHTML = renderDisplay(next);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calcTime = (milliseconds: number) => {
    const secondsTotal = Math.floor(milliseconds / 1000);
    const days = Math.floor(secondsTotal / 86400);
    const hours = Math.floor((secondsTotal % 86400) / 3600);
    const minutes = Math.floor((secondsTotal % 3600) / 60);
    const seconds = secondsTotal % 60;
    return [days, hours, minutes, seconds].map((v) =>
      v.toString().padStart(2, "0")
    );
  };

  const renderDisplay = (timeArr: string[]) => {
    return timeArr
      .map(
        (item) =>
          `<div class='container'><div class='a'><div>${item}</div></div></div>`
      )
      .join("");
  };

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const allSuggestions = [
    "Profitable business makes your profit Best Solution",
    "Details Profitable business makes your profit",
    "One Profitable business makes your profit",
    "Me Profitable business makes your profit",
    "Details business makes your profit",
    "Firebase business makes your profit",
    "Netlyfy business makes your profit",
    "Profitable business makes your profit",
    "Valuable business makes your profit",
    "System business makes your profit",
    "Profitables business makes your profit",
    "Content business makes your profit",
    "Dalivaring business makes your profit",
    "Staning business makes your profit",
    "Best business makes your profit",
    "cooler business makes your profit",
    "Best-one Profitable business makes your profit",
    "Super Fresh Meat",
    "Original Fresh frut",
    "Organic Fresh frut",
    "Lite Fresh frut",
  ];

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = allSuggestions.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    router.push(`/shop?search=${encodeURIComponent(suggestion)}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    } else {
      router.push("/shop");
    }
  };

  // If general settings are still loading, we can render a lightweight skeleton
  // This prevents components that expect settings from rendering undefined content.
  if (isLoading) {
    return (
      <div className="rts-header-one-area-one">
        <div style={{ padding: 12 }}>Loading header…</div>
      </div>
    );
  }

  // If there was a fatal error fetching settings, still render header with defaults
  // (we already merged defaults into `gs` above)
  if (isError) {
    // optionally show a non-blocking warning; keep rendering so header exists
    console.warn("HeaderOne: failed to load generalSettings, using defaults.");
  }

  return (
    <>
      <div className="rts-header-one-area-one">
        {/* top bar */}
        <div className="header-top-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="bwtween-area-header-top">
                  <div className="discount-area">
                    <p className="disc">{gs.headerTab}</p>
                    {/* countdown optional */}
                    {/* <div className="countdown">
                      <div className="countDown">10/05/2025 10:20:00</div>
                    </div> */}
                  </div>
                  <div className="contact-number-area">
                    <p>
                      Need help? Call Us:{" "}
                      <Link
                        href={`tel:${gs.number ?? DEFAULT_SETTINGS.number}`}
                      >
                        +91 {gs.number ?? DEFAULT_SETTINGS.number}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* logo + search */}
        <div className="search-header-area-main">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="logo-search-category-wrapper">
                  <Link href="/" className="logo-area">
                    <img
                      src={gs.logo ?? DEFAULT_SETTINGS.logo}
                      alt={gs.siteTitle ?? "logo-main"}
                      className="logo w-25 p-2"
                      // fallback on broken image
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          DEFAULT_SETTINGS.logo;
                      }}
                    />
                  </Link>
                  <div className="category-search-wrapper">
                    {/* make the form wrapper position:relative so the absolute dropdown stays inside */}
                    <form
                      onSubmit={handleSubmit}
                      className="search-header"
                      autoComplete="off"
                      style={{ position: "relative" }}
                      role="search"
                      aria-label="Site search"
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for products, categories or brands"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() =>
                          searchTerm.length > 0 && setShowSuggestions(true)
                        }
                        aria-autocomplete="list"
                        aria-controls="autocomplete-list"
                      />
                      <button
                        type="submit"
                        className="rts-btn btn-primary radious-sm with-icon"
                      >
                        <div className="btn-text">Search</div>
                        <div className="arrow-icon" aria-hidden>
                          {/* VALID magnifier SVG path (no "...") */}
                          <svg
                            width={17}
                            height={16}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z"
                              stroke="#fff"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        </div>
                      </button>

                      {/* Autocomplete dropdown */}
                      {showSuggestions && suggestions.length > 0 && (
                        <ul
                          id="autocomplete-list"
                          className="autocomplete-suggestions"
                          style={{
                            position: "absolute",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc",
                            marginTop: "4px",
                            width: "100%",
                            maxHeight: "200px",
                            overflowY: "auto",
                            zIndex: 1000,
                            listStyleType: "none",
                            padding: 0,
                            borderRadius: "4px",
                          }}
                          role="listbox"
                        >
                          {suggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              style={{
                                padding: "8px 12px",
                                cursor: "pointer",
                              }}
                              onMouseDown={(e) => e.preventDefault()} // prevent input blur before click
                              role="option"
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </form>
                  </div>
                  <div className="actions-area">
                    <div className="search-btn" id="searchs" aria-hidden>
                      {/* small search icon (decorative) */}
                      <svg
                        width={17}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                      >
                        <path
                          d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z"
                          stroke="#1F1F25"
                          strokeWidth={1.2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </div>
                    <div className="menu-btn" id="menu-btn" aria-hidden>
                      <svg
                        width={20}
                        height={16}
                        viewBox="0 0 20 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect y={14} width={20} height={2} fill="#1F1F25" />
                        <rect y={7} width={20} height={2} fill="#1F1F25" />
                        <rect width={20} height={2} fill="#1F1F25" />
                      </svg>
                    </div>
                  </div>
                  <div className="accont-wishlist-cart-area-header">
                    <Link href="/account" className="btn-border-only account">
                      <i className="fa-light fa-user" />
                      <span>Account</span>
                    </Link>

                    <WishList />
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* main nav */}
        <HeaderNav />
      </div>
      <Sidebar />
      <BackToTop />
    </>
  );
}

export default HeaderOne;
