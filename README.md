# StockPulse 📈 – Real-Time NSE Stock Dashboard

**A full-stack cloud-native application** that solves the common problem of **outdated or dummy stock data** in most portfolio projects.  
StockPulse fetches **fresh NSE (India) stock data** using a public API and serves it through a professional backend.

**Backend – 100% Complete** ✅  
**Frontend – Actively in Progress** ⏳

## 🎯 Problem I'm Solving
Most student/stock projects use hard-coded or 2023 snapshot data.  
Recruiters see the same dummy "AAPL $150" everywhere.

**StockPulse is different** – it delivers **real, current NSE stock information**:
- Symbol, company name, market cap, current price, change, % change
- Data updated from live public endpoint

This shows real-world API integration, error resilience, and production thinking.

## 🏗️ Professional Backend Architecture
Clean layered Spring Boot design (enterprise standard):

com.gargi.stockpulse
├── controller  ← REST endpoints
├── service     ← Business logic
├── client      ← Real API calls
├── dto         ← Modern Java records
└── config      ← CORS, RestTemplate, Actuator


- Spring Boot 3.5.9 + Java 17
- Real API integration
- Actuator health checks
- External configuration
- CORS enabled
- Stateless design

## Live Backend
Run:
```bash
cd backend
./mvnw spring-boot:run




