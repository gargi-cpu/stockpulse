📈 StockPulse

An engineering-first, full-stack stock analytics dashboard focused on data interpretation, secure backend orchestration, and real-world system design.

1️⃣ What Problem This Project Solves

Most stock projects only display prices.

That creates two problems:

Raw prices don’t help users understand market context

Frontend-heavy designs expose secrets and don’t scale

StockPulse solves this by:

Interpreting stock data (not just showing it)

Centralizing business logic and third-party APIs in a secure backend

Delivering a clean, consistent interface to the frontend

2️⃣ Why This Project Is Different

StockPulse is built as a system, not a demo.

Typical Stock Project	StockPulse
Frontend calls stock API directly	Backend aggregates & normalizes data
Single API	Multiple sources behind one interface
Raw price display	Indicators + signals + trends
API keys in client	Secrets isolated in backend
Tutorial-style	Production-style

The focus is on architecture and decision-making, not UI hacks.

3️⃣ High-Level Architecture

StockPulse follows a split-tier architecture:

Frontend: React SPA (Vite)

Backend: Node.js + Express API (Backend For Frontend)

Frontend (React)
   ↓ HTTP
Backend (BFF API)
   ↓
External APIs (Market data, News)


This separation enables independent deployment, better security, and easier iteration.

4️⃣ Key Technical Decisions

Backend For Frontend (BFF):
The backend shapes data specifically for the UI instead of exposing raw vendor APIs.

Environment-based configuration:
Frontend uses VITE_API_BASE_URL to switch backends without code changes.

API key isolation:
All third-party keys are stored on the backend via environment variables.

Interpretation layer:
RSI, buy/sell signals, and historical trends are computed server-side.

Graceful failure handling:
The system handles rate limits, expired keys, and sleeping servers cleanly.

5️⃣ Repository Structure
project-root/
│
├── frontend/              # React + Vite SPA
│   ├── src/
│   ├── public/
│   ├── .env.example
│   └── README.md
│
├── backend/               # Node + Express API (BFF)
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── services/
│   ├── .env.example
│   └── README.md
│
├── .github/workflows/     # CI / automation
├── .gitignore
└── README.md


Each layer is isolated and can be developed or deployed independently.

6️⃣ How to Run the Project Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev


Ensure .env files are created from .env.example (no secrets committed).

7️⃣ Tradeoffs Considered

More moving parts (frontend + backend + env vars)

Requires clear API contracts between layers

Backend becomes a critical dependency

These tradeoffs reflect real production systems, not shortcuts.

8️⃣ Future Improvements

⏱️ Timeframe toggles (1D / 1W / 1M)

📉 Advanced indicators (MACD, Bollinger Bands)

🔔 Price alerts

📊 Portfolio tracking

🔄 WebSocket-based real-time updates

🧠 Smarter caching strategies
