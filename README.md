# Debo Ethiopia


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
- **Icons/Assets**: lucide-react, framer-motion, recharts

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn / pnpm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Hailemeskel-Getaneh/debo-Ethiopia.git
   cd debo-ngo-frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create `.env.local` in the root:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the development server
   ```bash
   npm run dev
   ```
   → Open http://localhost:5173

## 📁 Project Structure

```text
src/
├── admin/                   # protected admin panel & dashboard
├── assets/                  # images, icons, fonts
├── components/              # reusable UI (common components + layouts)
├── context/                 # global state (AuthContext, ThemeContext)
├── features/                # public/user-facing features
├── hooks/                   # shared custom hooks
├── routes/                  # routing config + protected routes
├── services/                # API layer (base API + domain services)
├── styles/                  # global CSS & Tailwind configuration
├── types/                   # shared TypeScript types
└── utils/                   # helpers & formatters
```

## 🖥️ Admin Panel Features

The admin panel has been fully implemented with a modern design and responsive sidebar:

- **Dashboard**: Real-time stats overview with interactive charts (Recharts) for donation trends and project progress.
- **User Management**: Comprehensive table with role filtering and status tracking.
- **Projects**: Grid/List views for monitoring active community projects, budgets, and progress.
- **Donations**: Transaction monitoring with detailed donor info and payment statuses.
- **Content Management**: News and Blog post management with draft/published state control.
- **Media Gallery**: Unified upload and filtering interface for project images and videos.
- **Communication**: Integrated contact message inbox with subject filtering and status tagging.
- **Achievements**: Visual timeline of NGO milestones and awards.
- **Settings**: Admin profile and security management.

## 🎨 Tailwind CSS Setup

This project uses Tailwind CSS integrated with Vite:

1. Added plugin to `vite.config.ts`
2. Integrated with `index.css`
3. Custom NGO color palette defined in `src/styles/globals.css`

## 📄 License

MIT License

## 🙏 Acknowledgments

- Vite & React
- Tailwind CSS & DaisyUI
- Lucide React & Framer Motion
- Recharts for visualization

---
Made with ❤️ for community impact
Last updated: February 2026.
