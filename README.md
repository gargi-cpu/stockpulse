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

## 🚀 Live Backend Demo

Run:
## 🚀 Live Backend Demo

Run:

```bash
cd backend
./mvnw spring-boot:run

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
```


## 🎨 Frontend Development (Work in Progress 🚧)

The frontend of **StockPulse** is actively being developed to present real NSE stock data in a clean, intuitive, and recruiter-friendly dashboard.

Unlike typical student projects that focus only on UI design, the frontend is being built with a **backend-first and API-driven approach**, mirroring how real-world SaaS dashboards are engineered.

### 🎯 Frontend Goals

- Consume live stock data **only from the StockPulse backend**
- Present complex market data in a **clear and readable format**
- Focus on usability, clarity, and data understanding rather than flashy animations
- Keep the frontend lightweight, stateless, and scalable

### 🧩 Planned Frontend Features

- 📊 **Live Stock Table**
  - Displays real NSE stocks fetched from backend APIs
  - Columns include symbol, company name, current price, change, and % change

- 🔍 **Search & Filter**
  - Search stocks by symbol or company name
  - Client-side filtering for fast user experience

- 🎨 **Visual Market Indicators**
  - Green indicators for positive price movement
  - Red indicators for negative price movement
  - Clear formatting to quickly understand market trends

- 🔗 **API-First Integration**
  - Frontend never calls external stock APIs directly
  - All data flows through the backend microservice
  - Enables future features like caching, auth, and rate limiting

### 🧠 Engineering Mindset

The frontend is intentionally being built **incrementally**, following real engineering practices:
- Stable backend first
- Clear API contracts
- Progressive UI enhancement
- Easy future extension (charts, alerts, user preferences)

This approach demonstrates **full-stack thinking**, not just UI implementation.

### 🔮 Upcoming Enhancements

- 📈 Interactive price charts
- ⚡ Optimized data loading
- 📱 Responsive layout for different screen sizes
- ☁️ Production deployment readiness

> The frontend is a work in progress by design — showcasing how features evolve in real software projects rather than appearing as a one-time static UI.




  
