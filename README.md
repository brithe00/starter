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
- **🔑 Better Auth** for authentication

## 🔐 Environment Variables

### Server (.env.server file)

Create a `.env.server` file in the server directory with these variables:

```
NODE_ENV=development
PORT=8000
DATABASE_URL=postgresql://postgres:postgres@db:5432/app?schema=public
CORS_ORIGIN=http://localhost:5173
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:8000
DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret
```

### Client (.env.client file)

Create a `.env.client` file in the client directory:

```
VITE_API_URL=http://localhost:8000
VITE_CLIENT_URL=http://localhost:5173
```

### Database (.env.db file)

Create a `.env.db` file in the root directory:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=app
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
   # For database
   cp .env.db.example .env.db
   # Edit .env.db as needed

   # For server
   cp server/.env.example server/.env.server
   # Edit server/.env.server as needed

   # For client
   touch client/.env.client
   echo "VITE_API_URL=http://localhost:8000" > client/.env.client
   echo "VITE_CLIENT_URL=http://localhost:5173" >> client/.env.client
   ```

3. Start the development environment:
   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

This will:

- 🎭 Start the React client on port 5173
- 🔥 Start the Hono.js server on port 8000
- 🐘 Start a PostgreSQL database on port 5432
- 🔍 Start Prisma Studio on port 5555

### 🌐 Accessing the Application

- 🎨 Frontend: http://localhost:5173
- 🔌 Backend API: http://localhost:8000
- 📊 Prisma Studio: http://localhost:5555

## 🔐 Authentication

This template includes Better Auth for authentication with:

- 🔑 Discord OAuth integration
- 👤 User session management
- 🔒 Secure authentication flow

## ✨ Features

- ⚡ **Ultra-fast Hono.js backend** - built for performance
- 🔥 **Hot Module Replacement** for both client and server
- 🐳 **Docker-based development environment** for consistency
- 📊 **Database migrations** with Prisma
- 🛡️ **Type safety** with TypeScript
- 🔒 **API validation** with Zod
- 🎭 **Modern UI components** with Shadcn UI
- 📱 **Responsive design** with Tailwind CSS
- 🔐 **Authentication** with Better Auth
- 🔌 **Social login** with Discord

## 📝 Development Notes

- 🔑 All client-side environment variables should be prefixed with `VITE_` for Vite to expose them
- 🔄 Server environment variables are validated using Zod in the server/src/config/env.ts file
- 🛠️ The setup includes development tools like React Query Devtools and TanStack Router Devtools
- 🔍 Use Prisma Studio for database exploration (accessible at http://localhost:5555)
- 🔐 Authentication is handled through Better Auth with Discord integration
