# 🚀 Full Stack Application Starter Template 🌟

This is a modern full stack application starter template with React (client) and Hono (server) using Docker for development.

## 🛠️ Technology Stack

### 🎨 Client

- **⚛️ React 19** with TypeScript
- **⚡ Vite** as the build tool
- **🧭 TanStack Router** for routing
- **🔄 TanStack Query** for data fetching and state management
- **🎭 Shadcn UI** with Tailwind CSS for styling

### 🖥️ Server

- **🔥 Hono.js** - a lightweight, ultra-fast web framework for Node.js
- **🔌 Prisma** as the ORM
- **🐘 PostgreSQL** database
- **📝 Zod** for API validation

## 📁 Project Structure

```
├── client/            # 🎭 React frontend application
│   ├── public/        # 📂 Static assets
│   ├── src/           # 💻 Source code
│   │   ├── components/# 🧩 Reusable UI components
│   │   ├── lib/       # 🔧 Utility functions
│   │   └── routes/    # 🛣️ Application routes
├── server/            # 🖥️ Hono.js backend application
│   ├── prisma/        # 🔌 Prisma schema and migrations
│   └── src/           # 🧠 Server source code
│       ├── controllers/# 🎮 Request handlers
│       ├── middlewares/# 🛡️ Custom middlewares
│       ├── routes/    # 🛣️ API routes
│       └── services/  # 📊 Business logic
├── docker-compose.dev.yml # 🐳 Dev environment configuration
```

## 🚀 Getting Started

### 📋 Prerequisites

- 🐳 Docker and Docker Compose
- 📦 Node.js (for local development)

### 🏗️ Development

1. Clone the repository:

   ```bash
   git clone https://github.com/brithe00/starter.git
   cd starter
   ```

2. Start the development environment:
   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

This will:

- 🎭 Start the React client on port 5173
- 🔥 Start the Hono.js server on port 8000
- 🐘 Start a PostgreSQL database on port 5432

### 🌐 Accessing the Application

- 🎨 Frontend: http://localhost:5173
- 🔌 Backend API: http://localhost:8000

## ✨ Features

- ⚡ **Ultra-fast Hono.js backend** - built for performance
- 🔥 **Hot Module Replacement** for both client and server
- 🐳 **Docker-based development environment** for consistency
- 📊 **Database migrations** with Prisma
- 🛡️ **Type safety** with TypeScript
- 🔒 **API validation** with Zod
- 🎭 **Modern UI components** with Shadcn UI
- 📱 **Responsive design** with Tailwind CSS

## 📝 Development Notes

- 🔑 All client-side environment variables should be prefixed with `VITE_` for Vite to expose them
- 🔄 Server automatically connects to the database container
- 🛠️ The setup includes development tools like React Query Devtools and TanStack Router Devtools
- 🔍 Use Prisma Studio for database exploration (`npm run prisma:studio` in the server directory)
