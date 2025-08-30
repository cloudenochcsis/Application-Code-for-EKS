# Event Booking Availability App

This is a 3-tier web application that allows users to check for event availability on a given date and book it if available.

## Tech Stack

- **Frontend:** Vue.js (Vite), TailwindCSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (running in Docker)
- **ORM:** Prisma

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose

## Getting Started

Follow these steps to get the application running locally.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd event-booking-app
```

### 2. Backend Setup

Navigate to the backend directory and install the dependencies.

```bash
cd backend
npm install
```

### 3. Frontend Setup

In a separate terminal, navigate to the frontend directory and install the dependencies.

```bash
cd frontend
npm install
```

### 4. Start the Database

From the project's root directory, start the PostgreSQL database container using Docker Compose.

```bash
docker-compose up -d
```

This will start a PostgreSQL server on `localhost:5432`.

### 5. Run Database Migrations

Once the database is running, apply the database schema migrations from the `backend` directory.

```bash
cd backend
npx prisma migrate dev
```

### 6. Run the Application

You need to run both the backend and frontend servers.

- **Start the Backend Server (from the `backend` directory):**
  ```bash
  npm start
  ```
  The backend will be running at `http://localhost:3000`.

- **Start the Frontend Server (from the `frontend` directory):**
  ```bash
  npm run dev
  ```
  The frontend will be available at `http://localhost:5173`.

## API Endpoints

### Check Availability

- **URL:** `/availability`
- **Method:** `GET`
- **Query Params:** `date=YYYY-MM-DD`
- **Success Response:** `{ "available": true/false }`

### Create Booking

- **URL:** `/book`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "event_date": "YYYY-MM-DD",
    "event_type": "string",
    "customer_name": "string",
    "customer_email": "string",
    "customer_phone": "string"
  }
  ```
- **Success Response:** `{ "message": "Booking confirmed" }`
- **Error Response (Date Taken):** `{ "message": "Date already booked" }`
