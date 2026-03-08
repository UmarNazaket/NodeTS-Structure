# NodeTS-Structure

A production-ready, scalable, and secure Node.js & TypeScript boilerplate using Express 5 and TypeORM 0.3.

## Features

- **TypeScript 5.x**: Modern TypeSafe development.
- **Express 5.x**: Latest Express version with native async error handling.
- **TypeORM 0.3.x**: Data Mapper pattern with modern `DataSource` implementation.
- **Security First**:
    - **Helmet**: Secures apps by setting various HTTP headers.
    - **CORS**: Configurable Cross-Origin Resource Sharing.
    - **Rate Limiting**: Protects against brute-force and DDoS.
    - **BCrypt**: Secure password hashing.
    - **JWT**: Secure authentication (stateless).
- **Architecture**:
    - **Layered Structure**: Separation of concerns (Controllers, Services, Models, Routes, Middlewares, Validators).
    - **Global Error Handling**: Centralized error management with custom `AppError` class.
    - **Environment Validation**: Strict Joi-based validation for `.env` variables at runtime.
    - **Request Validation**: Automatic schema validation using Joi before hitting controllers.

## Project Structure

```text
src/
├── config/             # Configuration files (Database, Environment validation)
│   ├── database.ts     # TypeORM DataSource configuration
│   └── env.ts          # Centralized and validated environment variables
├── controllers/        # Request handlers (Parsing, delegating to services)
│   └── user.controller.ts
├── middlewares/        # Express middlewares (Auth, Error handling, Validation)
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validate.middleware.ts
├── models/             # Database entities (TypeORM classes)
│   ├── User.ts
│   └── Book.ts
├── routes/             # Route definitions
│   ├── index.ts        # Main router entry
│   └── user.routes.ts  # User-specific routes
├── services/           # Business logic (DB operations, heavy calculations)
│   └── user.service.ts
├── types/              # Global Type definitions and Interfaces
│   └── index.ts
├── utils/              # Helper functions and utilities
│   └── response.util.ts # Standardized response formatters
└── index.ts            # Application entry point
```

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- PostgreSQL

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your database credentials and secret keys.

### Running the App

- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Build (Transpile to JS)**:
  ```bash
  npm run build
  ```
- **Production Mode**:
  ```bash
  npm run build
  npm start
  ```

## Security Best Practices Implemented

- **Password Hashing**: Uses `bcrypt` with a salt factor of 10.
- **JWT Content**: JWT payload only contains `id` and `email`. Never include the password hash.
- **Environment Safety**: Credentials are never hardcoded; they are loaded via `.env` and validated at startup.
- **Error Privacy**: Stack traces are only exposed in `development` mode; production errors are clean and secure.
- **Database Safety**: `synchronize: true` is disabled for production to prevent accidental data loss.

