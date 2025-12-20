# StockPulse 📈 – Real-Time NSE Stock Dashboard

**Full-stack cloud-native stock dashboard** built from scratch.

**Unique Value**: Unlike most portfolio projects that use hard-coded or old 2023 dummy data, StockPulse fetches **real NSE (India) stock data** from a public API – making it look **fancy, professional, and production-like**.

**Backend – 100% Complete & Working** ✅  
**Frontend – Actively Building (Work in Progress)** ⏳

## What Makes This Project Stand Out
- No dummy data like "AAPL $150"
- Real stock information: symbol, company name, market cap, current price, change, % change
- Clean, enterprise-grade backend architecture
- Looks **fancy and modern** to recruiters

## Clean Backend Architecture
com.gargi.stockpulse
├── controller  ← /api/stocks endpoint
├── service     ← Business logic
├── client      ← Calls real stock API
├── dto         ← Modern Java records
└── config      ← CORS, RestTemplate, Actuator


- Spring Boot 3.5.9 + Java 17
- Real API integration (fresh data)
- Spring Boot Actuator (health checks)
- External configuration
- CORS enabled
- Stateless & Kubernetes-ready

## Live Backend Demo
Run:
```bash
cd backend
./mvnw spring-boot:run
Visit: http://localhost:8080/api/stocks
Real response example:
{
  "statusCode": 200,
  "data": [
    {
      "symbol": "RELIANCE",
      "name": "Reliance Industries Limited",
      "currentPrice": "₹3123.45",
      "change": "+45.30",
      "percentChange": "+1.47%"
    }
  ]
}

