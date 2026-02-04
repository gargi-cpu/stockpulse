# StockPulse

Full-stack stock dashboard with a React frontend and a Node/Express backend.

## Structure
- `frontend/` Vite + React client
- `backend/` Node/Express API (auth, stocks, news, Alpaca data)
- `.github/workflows/` CI
- `legacy/java-backend/` archived Spring Boot backend (not used by default)

## Local Development

### Backend
```bash
cd backend
npm install
```

Create `.env` from `.env.example`, then:
```bash
npm run dev
```

Health check:
```
GET http://localhost:4000/health
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in `frontend/.env`:
```
VITE_API_BASE_URL=http://localhost:4000
```

## Notes
- Backend and frontend run independently.
- No secrets are committed; use `.env` files locally.
