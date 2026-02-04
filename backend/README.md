# StockPulse Backend

Node/Express backend API for authentication, stocks, Alpaca market data, and news.

## Requirements
- Node.js 18+
- MongoDB (local or hosted)

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and set values.
3. `npm run dev`

## Environment Variables
- `MONGODB_URI`
- `PORT` (default: 4000)
- `JWT_SECRET`
- `CORS_ORIGIN`
- `ALPACA_API_KEY`
- `ALPACA_API_SECRET`
- `ALPACA_DATA_BASE_URL`
- `NEWS_API_KEY`
- `NEWS_API_BASE_URL`
- `ALPHA_VANTAGE_API_KEY`

## Endpoints
- `GET /health` → `{ status: "ok" }`
- `POST /auth/login` → `{ token, user }`
- `GET /auth/me` (Bearer token)
- `GET /api/stocks/:symbol`
- `GET /api/alpaca/bars/:symbol`
- `GET /api/news?symbols=AAPL,TSLA`
