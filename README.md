Design documentation and demo video are available at: https://drive.google.com/drive/folders/1voYzkMVuL6LPetYTz0hh8heFsCabfkbH?usp=sharing.
It includes full architecture, database schema, wireframes, and a walkthrough of all core features.



# 📖 PageTurn – Book Exchange Marketplace

PageTurn is a modern, community-driven book exchange platform that allows users to browse, list, and trade books easily. Designed with a sleek UI and robust functionality, PageTurn bridges book lovers through a simple yet powerful interface.

🔗 **Live Demo**: [PageTurn Marketplace](https://eclectic-licorice-16ee98.netlify.app/)

---

## ✨ Features

- 📚 Browse and search a curated list of books  
- 🔍 Advanced filtering options (by title, author, genre)  
- 👤 Secure user authentication & profile management  
- ➕ Add, edit, or remove your own book listings  
- ⚡ Fast, responsive, and mobile-friendly interface  
- 🎨 Beautiful UI with smooth animations and accessibility in mind  

---

## 🛠️ Tech Stack

| Category         | Tools & Libraries |
|------------------|------------------|
| **Frontend**     | React (with TypeScript), Vite |
| **Styling**      | Tailwind CSS, shadcn/ui |
| **Routing**      | React Router DOM |
| **State Mgmt**   | TanStack Query (React Query) |
| **Forms**        | React Hook Form + Zod |
| **Components**   | Radix UI, Lucide React |
| **Charts**       | Recharts |
| **Notifications**| Sonner |

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v16+ recommended)
- npm, yarn, or pnpm

### 📦 Installation

```bash
git clone https://github.com/sainikhil849/book.git
cd book
npm install
# or
yarn install
# or
pnpm install
npm run dev
# or
yarn dev
# or
pnpm dev
Visit http://localhost:5173 to view the app in your browser.

src/
├── components/     # Shared UI components (buttons, cards, etc.)
├── contexts/       # Global context providers (e.g., auth, theme)
├── hooks/          # Custom React hooks
├── lib/            # Utility functions (e.g., API helpers)
├── pages/          # Page-level components
├── services/       # API interaction logic
└── types/          # TypeScript types and interfaces

Created with ❤️ by Sai Nikhil



