# Debo Ethiopia

````markdown
# Debo NGO Frontend

A modern, responsive **NGO website frontend** built for an organization focused on community empowerment through education, impact showcasing, donations, and engagement.

This is the **client-side** application (React + Vite + TypeScript + Tailwind CSS) with:

- Public/user-facing pages (home, about, tutorials, gallery, achievements, donate, contact, newsletter)
- Protected admin dashboard (manage donations, contacts, subscribers, gallery uploads, achievements)

## ✨ Features

- Clean, responsive design with **Tailwind CSS**
- Feature-based folder structure for scalability
- Role-based access: public users vs admin panel
- Form handling (donation, contact, newsletter subscription)
- Gallery showcase (public view + admin upload/management)
- Achievements/milestones display
- Protected routes using React Router + context
- Type-safe API services matching backend DB schema
- Global state with React Context (auth, theme)

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+ (with Hooks)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4 (installed via official Vite guide)
- **Language**: TypeScript
- **Routing**: React Router v6
- **HTTP Client**: Axios (via services layer)
- **State Management**: React Context (for auth & global state)
- **Icons/Assets**: Custom or libraries like lucide-react / heroicons

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn / pnpm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/YOUR_USERNAME/debo-ngo-frontend.git
   cd debo-ngo-frontend
   ```
````

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables  
   Create `.env.local` in the root:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api   # or your backend URL
   ```

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   → Open http://localhost:5173 (default Vite port)

### Build for Production

```bash
npm run build
```

Output goes to `dist/` folder — ready for deployment (Vercel, Netlify, GitHub Pages, etc.)

## 📁 Project Structure

```text
src/
├── assets/                  # images, icons, PDFs (tutorials), fonts
├── components/              # reusable UI (common Button, Card, Modal + layouts)
│   ├── common/
│   ├── layout/
│   └── ui/
├── features/                # public/user-facing features
│   ├── auth/
│   ├── home/
│   ├── about/
│   ├── tutorials/
│   ├── gallery/
│   ├── achievements/
│   ├── donate/
│   ├── contact/
│   └── newsletter/
├── admin/                   # protected admin panel
│   ├── dashboard/
│   ├── donations/
│   ├── contacts/
│   ├── subscribers/
│   ├── gallery/
│   ├── achievements/
│   └── shared/
├── context/                 # global state (AuthContext, ThemeContext)
├── hooks/                   # shared custom hooks
├── services/                # API layer (axios instance + domain services)
├── routes/                  # routing config + protected routes
├── types/                   # shared TypeScript types (Donation, Contact, etc.)
├── utils/                   # helpers (formatCurrency, dateFormat...)
├── App.tsx
├── main.tsx
└── index.css
```

## 🖥️ How to Use / Contribute

1. **Public Pages** — accessible without login (home, donate, gallery...)
2. **Admin Panel** — login required (role-based via AuthContext)
3. **API Integration** — all backend calls go through `services/` (configurable via `VITE_API_BASE_URL`)

To contribute:

- Fork the repo
- Create feature branch (`git checkout -b feature/add-events`)
- Commit changes (`git commit -m 'Add events page'`)
- Push (`git push origin feature/add-events`)
- Open Pull Request

## 🎨 Tailwind CSS Setup (How It Was Installed)

This project uses Tailwind CSS integrated with Vite following the official guide:

1. Created Vite + React + TS project
2. Installed Tailwind:

   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

3. Added plugin to `vite.config.ts`:

   ```ts
   import { defineConfig } from "vite";
   import tailwindcss from "@tailwindcss/vite";
   import react from "@vitejs/plugin-react";

   export default defineConfig({
     plugins: [react(), tailwindcss()],
   });
   ```

4. Imported Tailwind in main CSS file (`src/index.css` or `src/style.css`):

   ```css
   @import "tailwindcss";
   ```

Now you can use utility classes like `bg-blue-600 text-white p-6 rounded-lg` everywhere.

## 📄 License

MIT License — feel free to use, modify, and distribute.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- Official Tailwind + Vite installation guide: https://tailwindcss.com/docs/installation/using-vite

---

Made with ❤️ for community impact  
Last updated: February 2026

````

### Quick Tips Before Pushing to GitHub

- Replace `YOUR_USERNAME` with your actual GitHub username
- Add real screenshots (use tools like Lightshot or browser dev tools → save as PNG → put in `public/screenshots/` and link them with `![Home Page](public/screenshots/home.png)`)
- If you have a live demo (Vercel/Netlify), add a badge/link at the top:
  [![Live Demo](https://img.shields.io/badge/Live%20Demo-View-brightgreen)](https://your-demo-url.vercel.app)
- Add badges for tech stack (shields.io):

  ```markdown
  [![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?logo=vite&logoColor=white)](https://vitejs.dev)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
````
