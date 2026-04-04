# 3zozComm

A modern e-commerce web application built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Features

- 🛍️ **Product Browsing** — Browse products by category on the Home page
- 🛒 **Shopping Cart** — Add products to cart and manage items
- 🔧 **Admin Panel** — Create, read, update, and delete products via the Admin CRUD page
- 📄 **About Page** — Learn more about the project
- 🔒 **Supabase Backend** — Data persistence and authentication powered by Supabase
- 🎨 **DaisyUI + Tailwind CSS** — Clean, responsive UI components

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [DaisyUI v5](https://daisyui.com/) | UI component library |
| [Supabase](https://supabase.com/) | Backend-as-a-service (database & auth) |
| [React Hot Toast](https://react-hot-toast.com/) | Toast notifications |

## Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | Home | Product listing with category filter |
| `/about` | About | About page |
| `/cart` | Cart | Shopping cart |
| `/admin-crud` | AdminCrud | Admin product management |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) project

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmadezzat472/3zozComm.git
   cd 3zozComm
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the project root and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/
│   ├── Admin-Crud/     # Admin CRUD panel
│   ├── cart/           # Cart components
│   ├── products/       # Product card & cart button
│   ├── Header.tsx
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Layout.tsx
│   └── Input.tsx
├── constants/          # App-wide constants
├── providers/          # React context providers
├── routes/             # App routing
├── types/              # TypeScript type definitions
└── main.tsx
```
