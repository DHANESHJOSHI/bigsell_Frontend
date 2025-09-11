# Source Code Documentation - EkoMart E-commerce Platform

## Project Overview

**Project Name:** EkoMart NextJS  
**Version:** 0.1.0  
**Technology Stack:** Next.js 15.3.1, React 19, TypeScript, Redux Toolkit, Material UI  
**Description:** A comprehensive e-commerce platform built with Next.js for online shopping of fashion and lifestyle products.

---

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [Technology Stack](#technology-stack)
3. [Directory Structure](#directory-structure)
4. [Key Features](#key-features)
5. [Components Overview](#components-overview)
6. [State Management](#state-management)
7. [Data Management](#data-management)
8. [Routing Structure](#routing-structure)
9. [Development Setup](#development-setup)
10. [Dependencies](#dependencies)

---

## Project Architecture

This is a modern e-commerce application built using Next.js App Router with the following architectural patterns:

- **Frontend Framework:** Next.js with App Router
- **Component Architecture:** Modular component-based structure
- **State Management:** Redux Toolkit with Context API for specific features
- **Styling:** Bootstrap + Custom CSS + Material UI
- **Data Fetching:** API routes with Next.js
- **Authentication:** NextAuth.js integration

---

## Technology Stack

### Frontend Technologies
- **Next.js 15.3.1** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5** - Type safety
- **Material UI 7.1.1** - Component library
- **Bootstrap 5.3.5** - CSS framework
- **Styled Components 6.1.19** - CSS-in-JS

### State Management & Data
- **Redux Toolkit 2.8.2** - Global state management
- **React Redux 9.2.0** - React bindings for Redux
- **React Hook Form 7.62.0** - Form management

### UI & Visualization
- **ApexCharts 4.7.0** - Charts and graphs
- **React ApexCharts 1.7.0** - React wrapper for ApexCharts
- **React CountUp 6.5.3** - Animated counters
- **Swiper 11.2.6** - Touch slider

### Additional Libraries
- **NextAuth 4.24.11** - Authentication
- **React Toastify 11.0.5** - Notifications
- **React Data Table Component 7.7.0** - Data tables
- **React Router DOM 7.6.0** - Client-side routing

---

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (demos)/           # Demo pages group
│   ├── (inner)/           # Inner pages group
│   ├── dashboard/         # Dashboard pages
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # Reusable React components
│   ├── about/            # About page components
│   ├── banner/           # Banner components
│   ├── blog/            # Blog components
│   ├── category/        # Category components
│   ├── common/          # Common/shared components
│   ├── counterup/       # Counter components
│   ├── feature/         # Feature components
│   ├── footer/          # Footer components
│   ├── header/          # Header components
│   ├── modal/           # Modal components
│   ├── process/         # Process components
│   ├── product/         # Product components
│   ├── product-main/    # Main product components
│   ├── service/         # Service components
│   └── testimonials/    # Testimonial components
├── data/                 # Static data files
│   ├── Posts.json       # Blog posts data
│   ├── Product.json     # Product catalog data
│   ├── bestSellingProduct.json  # Best selling products
│   └── discountProduct.json     # Discount products
├── providers/           # Context providers
│   └── ReduxProvider.tsx
└── store/              # Redux store configuration
    ├── blogsApi.ts     # Blog API slice
    ├── categoryApi.ts  # Category API slice
    ├── contactApi.ts   # Contact API slice
    ├── productApi.ts   # Product API slice
    └── index.ts        # Store configuration
```

---

## Key Features

### 🛍️ E-commerce Core Features
- **Product Catalog** - Browse and search products
- **Shopping Cart** - Add/remove items, quantity management
- **Wishlist** - Save favorite products
- **Product Comparison** - Compare multiple products
- **Categories** - Organized product categories
- **Discounts & Offers** - Special pricing and promotions

### 🎨 User Interface Features
- **Responsive Design** - Mobile-first responsive layout
- **Modern UI** - Clean, professional design
- **Interactive Elements** - Sliders, modals, animations
- **Toast Notifications** - User feedback system
- **Data Tables** - Organized data display
- **Charts & Analytics** - Visual data representation

### 🔧 Technical Features
- **Server-Side Rendering** - Next.js SSR capabilities
- **Type Safety** - Full TypeScript implementation
- **State Management** - Centralized state with Redux
- **Authentication** - User login/registration system
- **API Integration** - RESTful API structure
- **Performance Optimization** - Next.js optimizations

---

## Components Overview

### Header Components
- **HeaderOne** - Main navigation header
- **CartContext** - Shopping cart state management
- **WishlistContext** - Wishlist state management
- **CompareContext** - Product comparison state management

### Product Components
- **FeatureProduct** - Featured products display
- **DiscountProduct** - Discounted products section
- **WeeklyBestSelling** - Best selling products
- **TrandingProduct** - Trending products showcase
- **FeatureDiscount** - Special discount features

### Layout Components
- **BannerOne** - Main banner/hero section
- **FooterOne** - Site footer
- **FeatureOne** - Feature highlights

### Utility Components
- **BlogOne** - Blog posts display
- **FeatureOne** - Feature sections
- **Modal Components** - Various modal dialogs

---

## State Management

### Redux Store Structure
The application uses Redux Toolkit for state management with the following API slices:

- **blogsApi** - Blog posts and content management
- **categoryApi** - Product categories management
- **contactApi** - Contact form and support
- **productApi** - Product catalog and details
- **disclaimerApi** - Legal disclaimers
- **faqApi** - Frequently asked questions
- **generalSettings** - Application settings
- **headerBannerApi** - Banner content management
- **helpSupportApi** - Help and support features
- **mainBannerApi** - Main banner content
- **paymentPolicyApi** - Payment policies
- **privacyPolicyApi** - Privacy policies
- **shippingPolicy** - Shipping information
- **siteSecurity** - Security settings
- **termsApi** - Terms and conditions
- **vendorPolicyApi** - Vendor policies

### Context Providers
- **CartProvider** - Shopping cart state
- **WishlistProvider** - Wishlist functionality
- **CompareProvider** - Product comparison
- **ReduxProvider** - Redux store provider

---

## Data Management

### Static Data Files
- **Product.json** - Main product catalog
- **bestSellingProduct.json** - Best selling products data
- **discountProduct.json** - Products with discounts
- **Posts.json** - Blog posts and articles

### API Integration
The application follows a modular API structure with dedicated slices for different data domains, enabling efficient data fetching and caching.

---

## Routing Structure

The application uses Next.js App Router with the following structure:

- **/** - Home page (main e-commerce landing)
- **/dashboard/** - Admin/user dashboard
- **/(demos)/** - Demo pages group
- **/(inner)/** - Inner content pages

---

## Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation & Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Development URLs
- Development: http://localhost:3000
- Production: Deploy on Vercel or preferred platform

---

## Dependencies

### Production Dependencies
- **@emotion/react & @emotion/styled** - CSS-in-JS emotion library
- **@mui/material** - Material UI components
- **@reduxjs/toolkit** - Redux state management
- **apexcharts & react-apexcharts** - Charting library
- **bootstrap & react-bootstrap** - Bootstrap framework
- **next** - Next.js framework
- **next-auth** - Authentication solution
- **react & react-dom** - React library
- **react-countup** - Animated counters
- **react-data-table-component** - Data table component
- **react-hook-form** - Form management
- **react-redux** - Redux React bindings
- **react-router-dom** - Client-side routing
- **react-toastify** - Toast notifications
- **styled-components** - CSS-in-JS styling
- **swiper** - Touch slider component

### Development Dependencies
- **@types/node, @types/react, @types/react-dom** - TypeScript definitions
- **typescript** - TypeScript compiler

---

## Code Quality & Standards

### TypeScript Configuration
- Strict type checking enabled
- Full type safety across all components
- Custom type definitions for API responses

### Styling Approach
- Bootstrap for base styling
- Custom CSS for specific components
- Material UI for advanced components
- Styled Components for dynamic styling

### Component Architecture
- Functional components with hooks
- Context API for local state management
- Redux for global state management
- Modular component structure for reusability

---

## Performance Optimizations

- **Next.js Optimizations** - Automatic code splitting and optimization
- **Image Optimization** - Next.js built-in image optimization
- **Font Optimization** - Google Fonts optimization with next/font
- **Bundle Analysis** - Optimized bundle sizes
- **Lazy Loading** - Component and route-based code splitting

---

## Security Features

- **NextAuth Integration** - Secure authentication
- **Type Safety** - Runtime type checking
- **API Security** - Secure API endpoints
- **Input Validation** - Form input validation
- **Content Security** - Secure content handling

---

## Future Enhancements

### Planned Features
- Payment gateway integration
- Advanced search and filtering
- User reviews and ratings
- Inventory management
- Order tracking system
- Multi-vendor support
- Mobile app development

### Technical Improvements
- Performance monitoring
- SEO optimizations
- Progressive Web App (PWA) features
- Advanced analytics
- A/B testing implementation

---

*This documentation provides a comprehensive overview of the EkoMart e-commerce platform codebase. For specific implementation details, refer to the individual component files and API documentation.*
