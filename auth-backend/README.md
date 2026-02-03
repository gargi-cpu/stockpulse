# Auth Backend (StockPulse)

Simple Node.js + Express + MongoDB backend for email-based identity tracking.

## Requirements
- Node.js 18+
- MongoDB (local or hosted)

## Setup
1. Install dependencies:
   - `npm install`
2. Create `.env` in this folder (based on `.env.example`):
   - `MONGODB_URI=mongodb://localhost:27017/stockpulse_auth`
   - `PORT=4000`
   - `JWT_SECRET=your_secret_here`
   - `CORS_ORIGIN=http://localhost:5173`
3. Start the server:
   - `npm start`

## Endpoints
- `GET /health`
  - Returns `{ "status": "ok" }`

- `POST /auth/login`
  - Body: `{ "email": "user@example.com" }`
  - If user exists: updates `lastLogin`
  - If user does not exist: creates new user
  - Returns `{ token, user: { email, createdAt } }`

- `GET /auth/me` (protected)
  - Header: `Authorization: Bearer <token>`
  - Returns `{ user: { email, createdAt } }`

## Notes
- Passwordless identity tracking only (no password/JWT yet).
- MongoDB connection uses `MONGODB_URI` environment variable.
