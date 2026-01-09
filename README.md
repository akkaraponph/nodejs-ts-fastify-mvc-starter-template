# Node.js TypeScript Fastify MVC Starter Template

A production-ready starter template for building RESTful APIs with Node.js, TypeScript, and Fastify. This template follows the **MVC (Model-Routes-Controllers-Services)** architecture pattern, providing a clean and scalable foundation for your backend projects.

## 🚀 Features

- **Fastify** - Fast and low overhead web framework
- **TypeScript** - Type-safe development
- **Sequelize ORM** - Database abstraction with PostgreSQL/MySQL support
- **JWT Authentication** - Secure token-based authentication
- **Swagger Documentation** - Auto-generated API documentation
- **CORS Support** - Cross-origin resource sharing configured
- **Error Handling** - Custom error handling middleware
- **MVC Architecture** - Clean separation of concerns
- **Environment Configuration** - Multi-environment support (dev, test, production)

## 📁 Project Structure

```
├── src/
│   ├── app.ts                 # Fastify app configuration
│   ├── config/                # Configuration files
│   │   ├── config.ts          # Environment variables
│   │   ├── db.config.ts       # Database configuration
│   │   └── swagger/           # Swagger documentation setup
│   ├── controllers/           # Request handlers (business logic)
│   ├── models/                # Sequelize database models
│   ├── routes/                # API route definitions
│   │   └── swaggerSchema/     # Swagger schema definitions
│   ├── services/              # Business logic layer
│   ├── middlewares/           # Custom middleware (auth, etc.)
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions and error handlers
├── dist/                      # Compiled JavaScript output
├── index.ts                   # Application entry point
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── env                        # Environment variables template
```

## 🏗️ Architecture Overview

This template follows the **MRCS (Model-Routes-Controllers-Services)** pattern:

- **Models** - Define database schema and relationships using Sequelize
- **Routes** - Define API endpoints and link them to controllers
- **Controllers** - Handle HTTP requests and responses
- **Services** - Contain business logic and data manipulation

### Request Flow

```
Request → Route → Middleware → Controller → Service → Model → Database
                ↓
            Response ← Controller ← Service ← Model
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** or **MySQL** database
- **TypeScript** knowledge (helpful but not required)

## 🔧 Installation

1. **Clone or download this template**

2. **Install dependencies**

   Using npm:
   ```bash
   npm install
   ```

   Using yarn:
   ```bash
   yarn install
   ```

3. **Set up environment variables**

   Copy the `env` file and create a `.env` file in the root directory:
   ```bash
   cp env .env
   ```

   Edit `.env` with your configuration:
   ```env
   PORT=5000
   JWT_SECRET=YourSuperSecretJWTKey
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   
   # Database Configuration
   DB_USERNAME_DEV=your_db_username
   DB_PASSWORD_DEV=your_db_password
   DB_DATABASE_DEV=your_database_name
   DB_HOST_DEV=localhost
   DB_DIALECT=postgres  # or 'mysql'
   ```

4. **Create your database**

   Make sure your PostgreSQL or MySQL database is running and create the database specified in your `.env` file.

## 🚀 Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

or

```bash
yarn dev
```

The server will start on the port specified in your `.env` file (default: 5000).

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run prettier` - Check code formatting
- `npm run prettier:fix` - Auto-fix code formatting
- `npm run eslint:fix` - Auto-fix ESLint errors

## 📚 API Documentation

Once the server is running, you can access the Swagger API documentation at:

```
http://localhost:5000/documentation
```

This interactive documentation allows you to:
- View all available endpoints
- Test API calls directly from the browser
- See request/response schemas

## 🔐 Authentication

The template includes JWT-based authentication. Protected routes use the `auth.middleware.ts` to verify tokens.

Example protected route:
```typescript
// In your route file
fastify.get('/protected', { preHandler: [authMiddleware] }, controller)
```

## 🗄️ Database

This template uses **Sequelize ORM** which supports multiple databases:

- PostgreSQL (recommended)
- MySQL
- SQLite
- MSSQL

The database connection is configured in `src/config/db.config.ts` and uses environment variables from your `.env` file.

### Database Sync

The application automatically syncs models with the database on startup. In production, consider using migrations instead.

## 📦 Dependencies

### Production Dependencies

- `fastify` - Web framework
- `@fastify/cors` - CORS support
- `@fastify/swagger` - API documentation
- `sequelize` - ORM for database operations
- `pg` / `mysql2` - Database drivers
- `jsonwebtoken` - JWT token generation
- `bcrypt` - Password hashing
- `dotenv` - Environment variable management

### Development Dependencies

- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution
- `nodemon` - Development server with auto-reload
- `@types/*` - TypeScript type definitions
- `eslint` - Code linting
- `prettier` - Code formatting

## 🛠️ Customization

### Adding a New Route

1. Create a controller in `src/controllers/`
2. Create a service in `src/services/`
3. Create a route file in `src/routes/`
4. Register the route in `src/app.ts`

Example:
```typescript
// src/routes/example.route.ts
import { FastifyInstance } from 'fastify';
import exampleController from '../controllers/example.controller';

export default async function exampleRouter(fastify: FastifyInstance) {
  fastify.get('/', exampleController.getAll);
  fastify.post('/', exampleController.create);
}
```

Then register in `src/app.ts`:
```typescript
import exampleRouter from './routes/example.route';
app.register(exampleRouter, { prefix: '/api/examples' });
```


## 🔗 Links

- [Fastify Documentation](https://www.fastify.io/)
- [Sequelize Documentation](https://sequelize.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

**Happy Coding! 🎉**