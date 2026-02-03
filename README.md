# StockPulse

Full-stack stock dashboard with a Spring Boot backend and a Vite + React frontend.

## Stack
- Backend: Spring Boot 3.x, Java 17+
- Frontend: Vite + React
- Data source: https://api.freeapi.app/api/v1/public/stocks (via backend)

## Local Development

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

Health check:
```
GET http://localhost:8080/api/health
```

Stocks endpoint:
```
GET http://localhost:8080/api/stocks
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Set the API base URL in `.env` (frontend root):
```
VITE_API_BASE_URL=http://localhost:8080/api
```

## API Contract (Backend)
- `GET /api/health` → plain text health message
- `GET /api/stocks` → JSON payload from `freeapi.app` (proxied by backend)

## Deployment (Backend)

### Render
1. Create a new Web Service from this repo.
2. Root directory: `backend`
3. Build command:
   ```
   ./mvnw -q -DskipTests package
   ```
4. Start command:
   ```
   java -jar target/*.jar
   ```
5. Environment variables:
   - `PORT` (Render sets this automatically)
   - `CORS_ALLOWED_ORIGINS` (set to your frontend URL)

### Railway
1. Create a new project from this repo.
2. Root directory: `backend`
3. Build command:
   ```
   ./mvnw -q -DskipTests package
   ```
4. Start command:
   ```
   java -jar target/*.jar
   ```
5. Environment variables:
   - `PORT` (Railway sets this automatically)
   - `CORS_ALLOWED_ORIGINS` (set to your frontend URL)

## Notes
- The backend proxies the public API and should be deployed independently.
- The frontend should use `VITE_API_BASE_URL` to target the backend.
