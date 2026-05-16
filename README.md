# LMS Web Application

A simple Learning Management System built with Node.js, Express, Prisma, and React.

Admin users can manage courses (create, update, delete). Trainee users can view courses and watch their videos.

## Tech Stack

**Backend**
- Node.js + Express
- Prisma ORM
- SQL Server
- JWT for authentication
- bcrypt for password hashing
- Zod for validation

**Frontend**
- React + Vite
- Tailwind CSS + DaisyUI
- React Router
- Axios

## Prerequisites

- Node.js (v18 or higher)
- SQL Server (Express edition works)
- npm

## Backend Setup

1. Go to the backend folder:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the backend folder with:

```
DATABASE_URL="sqlserver://localhost:1433;database=lms;user=YOUR_USER;password=YOUR_PASSWORD;trustServerCertificate=true"
JWT_SECRET="your-secret-key"
PORT=5000
```

4. Run database migrations:

```
npx prisma migrate dev
```

5. Seed the database (creates test accounts and courses):

```
npx prisma db seed
```

6. Start the server:

```
npm run dev
```

Backend runs on `http://localhost:5000`.

## Frontend Setup

1. Open a new terminal and go to the frontend folder:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Start the dev server:

```
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Test Accounts

| Role    | Email             | Password    |
|---------|-------------------|-------------|
| Admin   | admin@lms.com     | admin1234   |
| Trainee | trainee@lms.com   | trainee1234 |

## API Endpoints

**Auth**
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and get JWT token

**Courses**
- `GET /api/courses` — List all courses (Admin + Trainee)
- `GET /api/courses/:id` — Get a single course (Admin + Trainee)
- `POST /api/courses` — Create a course (Admin only)
- `PUT /api/courses/:id` — Update a course (Admin only)
- `DELETE /api/courses/:id` — Delete a course (Admin only)

## Project Structure

The backend follows a layered structure:

```
routes → controllers → services → repositories → database
```

This keeps the business logic separated from HTTP concerns and database access.

## Security

- Passwords are hashed using bcrypt before storing.
- JWT tokens are used for authentication.
- Protected routes check the user's role before allowing access.
- Prisma ORM is used to prevent SQL injection.
- Input validation with Zod on user input (auth and course endpoints).