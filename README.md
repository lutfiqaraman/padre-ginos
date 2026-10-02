# Papa Pizza

A full-stack pizza ordering application built with React and Node.js.

## Project Structure

```text
padre-ginos/
├── frontend/          # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/           # Node.js + Fastify backend
│   ├── config/
│   ├── routes/
│   ├── services/
│   ├── repositories/
│   ├── helpers/
│   ├── public/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Technologies

### Frontend

* React
* Vite
* JavaScript
* ESLint

### Backend

* Node.js
* Fastify
* SQLite
* promised-sqlite3

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/lutfiqaraman/padre-ginos.git
cd padre-ginos
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 4. Start the backend

From the `backend` folder:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

### 5. Start the frontend

From the `frontend` folder:

```bash
npm run dev
```

Vite will provide the frontend URL in the terminal, normally:

```text
http://localhost:5173
```

## Backend Architecture

The backend follows a simple layered structure:

```text
Route
  ↓
Service
  ↓
Repository
  ↓
Database
```

### Routes

HTTP request handling is located in:

```text
backend/routes/
```

### Services

Application/business logic is located in:

```text
backend/services/
```

### Repositories

Database access and SQL queries are located in:

```text
backend/repositories/
```

### Database

The application uses SQLite for local development.

The database file is intentionally excluded from Git:

```text
backend/pizza.sqlite
```

## Development

Run the backend with:

```bash
cd backend
npm run dev
```

Run the frontend with:

```bash
cd frontend
npm run dev
```

The frontend Vite development server proxies API requests to the backend running on port `3000`.
