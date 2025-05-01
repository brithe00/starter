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

## 🔐 Environment Variables

### Server (.env file)

Create a `.env` file in the server directory with these variables:

```
NODE_ENV=development
PORT=8000
DATABASE_URL=postgresql://postgres:postgres@db:5432/app?schema=public
CORS_ORIGIN=http://localhost:5173
```

### Client (.env file)

Create a `.env` file in the client directory:

```
VITE_API_URL=http://localhost:8000
```

> 🔒 **Never commit your actual .env files to version control!** Use .env.example files as templates.

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

2. Set up environment variables:

   ```bash
   # For server
   cp server/.env.example server/.env
   # Edit server/.env as needed

   # For client (if needed)
   touch client/.env
   echo "VITE_API_URL=http://localhost:8000" > client/.env
   ```

3. Start the development environment:
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
- 🔄 Server environment variables are validated using Zod in the server/src/config/env.ts file
- 🛠️ The setup includes development tools like React Query Devtools and TanStack Router Devtools
- 🔍 Use Prisma Studio for database exploration (`npm run prisma:studio` in the server directory)
