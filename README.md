# E-commerce Application

This document provides a comprehensive overview of the E-commerce application, detailing its setup, architectural design, and the technologies employed. This application is built with a focus on modern web development practices, leveraging Next.js for server-side rendering and client-side interactivity, and TanStack Query for efficient data management.

## Table of Contents

- [1. Introduction](#1-introduction)
- [2. Features](#2-features)
- [3. Architecture Overview](#3-architecture-overview)
- [4. Technology Stack](#4-technology-stack)
- [5. Setup and Installation](#5-setup-and-installation)
- [6. Project Structure](#6-project-structure)
- [7. Internationalization (i18n)](#7-internationalization-i18n)
- [8. Data Management with TanStack Query](#8-data-management-with-tanstack-query)
- [9. Styling and UI Components](#9-styling-and-ui-components)
- [10. Error Handling and Not Found Pages](#10-error-handling-and-not-found-pages)
- [11. Future Enhancements](#11-future-enhancements)
- [12. Contributing](#12-contributing)
- [13. License](#13-license)

## 1. Introduction

This E-commerce application serves as a robust and scalable platform for showcasing products and managing user interactions such as adding items to a cart or marking them as favorites. Developed with a strong emphasis on performance, user experience, and maintainability, it incorporates best practices for modern web applications. The application supports multiple languages, ensuring a broader reach and enhanced accessibility for diverse user bases.

## 2. Features

The application includes the following key features:

- **Product Listing**: Displays a list of available products with details such as title, price, description, category, and image.
- **Product Details**: Provides a dedicated page for each product with comprehensive information.
- **Shopping Cart**: Allows users to add, view, and remove products from their shopping cart. The cart state is persisted and managed efficiently.
- **Favorites List**: Enables users to mark products as favorites for easy access and future reference.
- **Internationalization (i18n)**: Supports multiple languages (English and Arabic) with dynamic content switching based on URL segments.
- **Responsive Design**: Ensures a consistent and optimal viewing experience across various devices and screen sizes.
- **Efficient Data Fetching**: Utilizes TanStack Query for caching, synchronization, and managing server state, leading to a highly performant and responsive UI.
- **Optimistic UI Updates**: Provides immediate feedback to users on actions like adding to cart or favorites, enhancing perceived performance.
- **Centralized State Management**: Leverages TanStack Query as the single source of truth for server-side data, simplifying client-side state.
- **Error Handling**: Implements custom error pages for both unexpected errors (500) and 404 (Not Found) errors, providing a graceful user experience.



## 3. Architecture Overview

The application follows a modern, component-based architecture, primarily leveraging the Next.js App Router. This architecture promotes modularity, reusability, and maintainability. The core principles guiding the architecture include:

-   **Server Components for Data Fetching and Initial Render**: Next.js Server Components are utilized for fetching data directly on the server, reducing client-side JavaScript bundles and improving initial page load performance. This is particularly beneficial for SEO and first contentful paint metrics. Data fetching for product listings and individual product details occurs within Server Components, which then pass the necessary data as props to Client Components.

-   **Client Components for Interactivity**: Interactive UI elements, user authentication flows, and any components requiring browser-specific APIs (like `useState`, `useEffect`, or event handlers) are implemented as Client Components. This clear separation ensures that only the necessary JavaScript is sent to the client, optimizing performance.

-   **TanStack Query for Client-Side Data Management**: For managing client-side server state, TanStack Query (formerly React Query) is employed. It handles caching, background re-fetching, data synchronization, and optimistic UI updates. This eliminates the need for traditional client-side state management libraries (like Redux for server-derived data) and simplifies complex data flows. All mutations (add to cart, add to favorites, remove from cart/favorites) are managed through TanStack Query, providing immediate user feedback and robust error handling with automatic rollbacks.

-   **API Layer**: A dedicated `lib/api.ts` file abstracts the data fetching logic, providing clean functions to interact with the backend (or a mock API in this case). This separation ensures that the UI components are decoupled from the data source, making it easier to switch or extend the backend later.

-   **Internationalization (i18n) via URL Segments**: The application implements i18n using Next.js\'s URL-based routing (`/[lang]/`). A custom `middleware.ts` intercepts requests to automatically redirect users to their preferred language or the default locale if none is specified. Translation dictionaries are loaded on the server side and passed down to Client Components, ensuring that all static and dynamic content is correctly localized.

-   **Modular Hooks**: Custom React hooks (`useCartHook`, `useFavorityHook`) encapsulate specific functionalities related to cart and favorites management. These hooks leverage TanStack Query internally, providing a clean and reusable interface for components to interact with application logic without directly touching data fetching or mutation details.

-   **Component Hierarchy**: The application follows a clear component hierarchy, starting from the root `layout.tsx` (Server Component) which wraps the `AppLayout.tsx` (Client Component). Nested layouts and pages handle specific routes, ensuring that components are rendered efficiently and only when needed. For instance, product listings and detail pages are rendered within their respective `page.tsx` files, which are Server Components responsible for initial data hydration.

This architectural approach leads to a highly performant, scalable, and maintainable e-commerce platform, taking full advantage of Next.js\'s capabilities for modern web development.



## 4. Technology Stack

This project is built using a robust and modern technology stack, chosen for its performance, developer experience, and scalability. The primary technologies include:

-   **Next.js (App Router)**: A React framework for building production-ready applications. It enables server-side rendering (SSR), static site generation (SSG), and incremental static regeneration (ISR), along with an intuitive file-system-based router. The App Router paradigm, with its distinction between Server and Client Components, is heavily utilized to optimize performance and bundle sizes.

-   **React**: The core JavaScript library for building user interfaces. React's component-based model facilitates modular and reusable UI development.

-   **TypeScript**: A superset of JavaScript that adds static type definitions. TypeScript enhances code quality, readability, and maintainability by catching errors at compile-time rather than runtime. It provides better tooling support and improves developer productivity, especially in larger codebases.

-   **TanStack Query (React Query)**: A powerful data-fetching library for React. It simplifies the management of server state, offering features like caching, background refetching, data synchronization, and optimistic UI updates. This significantly reduces the amount of boilerplate code needed for data management and improves the user experience by providing immediate feedback.

-   **Ant Design**: A popular React UI library that provides a rich set of high-quality, customizable components. Ant Design is used for building the application's user interface, ensuring a consistent, professional, and responsive design. Its comprehensive component library accelerates UI development and adheres to modern design principles.

-   **CSS Modules**: Used for styling components, providing scoped CSS to prevent style conflicts and improve maintainability. This ensures that styles applied to one component do not unintentionally affect other parts of the application.

-   **Node.js**: The JavaScript runtime environment that Next.js builds upon. It is used for running the development server, building the application, and executing server-side code.

-   **JSON Server (for mock API)**: A lightweight tool used to create a fake REST API quickly. For development purposes, `json-server` is used to simulate a backend API, providing product data, cart data, and favorites data. This allows frontend development to proceed independently of a full backend implementation.

This combination of technologies provides a solid foundation for a high-performance, scalable, and maintainable e-commerce application, ensuring a smooth development workflow and an excellent user experience.



## 5. Setup and Installation

To set up and run this E-commerce application locally, follow these steps. Ensure you have Node.js (version 18 or higher recommended) and npm (or yarn/pnpm) installed on your system.

### 5.1. Clone the Repository

First, clone the project repository to your local machine using Git:

```bash
git clone <repository-url>
cd <repository-name>
```

Replace `<repository-url>` with the actual URL of your Git repository and `<repository-name>` with the name of the cloned directory.

### 5.2. Install Dependencies

Navigate into the project directory and install the necessary Node.js dependencies. This project uses `npm` as its package manager, but `yarn` or `pnpm` can also be used.

```bash
npm install
# or
yarn install
# or
pnpm install
```

This command will download and install all the packages listed in the `package.json` file, including Next.js, React, TypeScript, Ant Design, TanStack Query, and other development dependencies.

### 5.3. Set up the Mock API (JSON Server)

This application uses `json-server` to simulate a backend API for development purposes. You need to start the JSON server separately to provide product, cart, and favorites data.

Ensure you have `json-server` installed globally or as a dev dependency. If not, you can install it:

```bash
npm install -g json-server
# or if installed as a dev dependency
npm install
```

The mock API data is typically defined in a `db.json` file at the root of your project. To start the JSON server, run the following command from your project\'s root directory:

```bash
json-server --watch db.json --port 4000
```

This command will start the API server on `http://localhost:4000`. The application expects the API endpoints to be available at this address (e.g., `http://localhost:4000/products`, `http://localhost:4000/cart`, `http://localhost:4000/favorites`).

### 5.4. Run the Next.js Development Server

With the mock API running, you can now start the Next.js development server. This will compile your application and make it accessible in your web browser.

```bash
npm run dev
```

After running this command, the application will typically be available at `http://localhost:3000`. The Next.js development server provides features like hot-reloading and error overlays for a smooth development experience.

### 5.5. Accessing the Application

Open your web browser and navigate to `http://localhost:3000`. The application\'s middleware will automatically redirect you to the default language locale (e.g., `http://localhost:3000/en`). You can then switch between English and Arabic using the language switcher in the header.

### 5.6. Building for Production

To create an optimized production build of the application, use the following command:

```bash
npm run build
```

This command will generate an optimized version of your application in the `.next` directory, ready for deployment. After building, you can start the production server using:

```bash
npm run start
```

Remember that for a production environment, you would typically replace the `json-server` mock API with a real backend service and configure your environment variables accordingly.



## 6. Project Structure

The project adheres to a well-organized and modular directory structure, typical for Next.js applications using the App Router. This structure promotes clear separation of concerns, making the codebase easier to navigate, understand, and maintain.

```
e-commerce/
├── .next/                  # Next.js build output (generated)
├── app/                    # Main application directory (App Router)
│   ├── AppLayout.module.css  # CSS Modules for the main layout
│   ├── AppLayout.tsx         # Client Component for the main application layout (header, footer, navigation)
│   ├── error.tsx             # Global error boundary for client-side errors
│   ├── Storeprovider.tsx     # Client Component for wrapping providers (TanStack Query, Ant Design)
│   └── [lang]/               # Dynamic route segment for internationalization (e.g., /en, /ar)
│       ├── cart/             # Cart page route
│       │   └── page.tsx
│       ├── favorite/         # Favorites page route
│       │   └── page.tsx
│       ├── layout.tsx        # Root layout for language-specific routes (Server Component)
│       ├── page.module.css   # CSS Modules for the home page
│       ├── page.tsx          # Home page (Server Component)
│       └── products/         # Products route
│           └── [id]/         # Dynamic route segment for individual product details
│               └── page.tsx
├── components/             # Reusable UI components (Client Components)
│   ├── CardComponent.tsx
│   ├── CartProductList.tsx
│   ├── FavoriteProductsList.tsx
│   ├── ProductDetails.tsx
│   └── ProductsList.tsx
├── hooks/                  # Custom React hooks for encapsulating logic
│   ├── cartHook.ts           # Logic for cart management (uses TanStack Query)
│   ├── favorityHook.ts       # Logic for favorites management (uses TanStack Query)
│   ├── imageHook.ts          # (Potentially) Image-related utility hook
│   ├── productHook.ts        # (Potentially) Product-related utility hook
│   └── productQueries.ts     # TanStack Query hooks for data fetching and mutations
├── lib/                    # Utility functions and interfaces
│   ├── api.ts                # API client for interacting with the backend/json-server
│   ├── interfaces.ts         # TypeScript interfaces for data structures (e.g., Product, Dictionary)
│   └── productUtils.ts       # Utility functions for product data manipulation (e.g., translation)
├── locales/                # Internationalization (i18n) translation files
│   ├── ar/                 # Arabic translations
│   │   └── common.json
│   └── en/                 # English translations
│       └── common.json
├── public/                 # Static assets (images, fonts, etc.)
├── store/                  # (Potentially) Redux store setup (now largely replaced by TanStack Query)
│   ├── cartSlice.ts          # (Deprecated) Redux slice for cart state
│   ├── globalSlice.ts        # (Deprecated) Redux slice for global state
│   └── index.ts              # (Deprecated) Redux store configuration
├── db.json                 # Mock API data for json-server
├── dictionary.ts           # Server-side utility for loading i18n dictionaries
├── middleware.ts           # Next.js middleware for i18n routing
├── next.config.js          # Next.js configuration file
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This documentation file
```

This structure ensures that:
-   **Routing is clear**: The `app/` directory directly maps to URL paths.
-   **Components are reusable**: Generic UI components reside in `components/`.
-   **Logic is encapsulated**: Custom hooks in `hooks/` abstract complex stateful logic.
-   **Utilities are centralized**: Common functions and types are in `lib/`.
-   **Translations are organized**: `locales/` holds all language-specific content.
-   **Static assets are accessible**: `public/` serves files directly at the root.

This modularity significantly improves the 
(Content truncated due to size limit. Use page ranges or line ranges to read remaining content)
