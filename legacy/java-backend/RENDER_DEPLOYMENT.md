# StockPulse Backend - Render Deployment Guide

## 🚀 Quick Deployment to Render

### Prerequisites
- GitHub/GitLab account
- Render account (free tier available at https://render.com)
- Your StockPulse backend code pushed to a Git repository

---

## 📋 Step-by-Step Deployment Instructions

### Step 1: Prepare Your Repository

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - StockPulse backend"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/stockpulse-backend.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Render

#### Option A: Using render.yaml (Recommended - Infrastructure as Code)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and configure everything
5. Click **"Apply"** to deploy

#### Option B: Manual Web Service Creation

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your repository
4. Configure the following:

   **Basic Settings:**
   - **Name:** `stockpulse-backend`
   - **Region:** Oregon (US West) or closest to you
   - **Branch:** `main`
   - **Runtime:** Java

   **Build & Deploy:**
   - **Build Command:** 
     ```bash
     ./mvnw clean package -DskipTests
     ```
   - **Start Command:** 
     ```bash
     java -Dserver.port=$PORT -jar target/backend-0.0.1-SNAPSHOT.jar
     ```

   **Environment Variables:**
   Add these in the "Environment" section:
   ```
   JAVA_TOOL_OPTIONS=-Xmx512m -Xms256m
   SERVER_PORT=8080
   STOCK_API_BASE_URL=https://api.freeapi.app/api/v1/public/stocks
   ```

   **Health Check:**
   - **Health Check Path:** `/actuator/health`

5. Click **"Create Web Service"**

### Step 3: Verify Deployment

1. Wait for the build to complete (5-10 minutes for first deployment)
2. Once deployed, Render will provide a URL like: `https://stockpulse-backend.onrender.com`
3. Test the health endpoint:
   ```
   https://your-app-name.onrender.com/actuator/health
   ```

---

## 🔧 Configuration Files Included

### `render.yaml`
Complete Render configuration with all settings pre-configured.

### `build.sh`
Build script that Render can use (alternative to inline build command).

### `Dockerfile`
Optional Docker configuration for containerized deployment.

### `.env.example`
Template for environment variables.

---

## 📡 API Endpoints

After deployment, your backend will be available at:
- **Base URL:** `https://your-app-name.onrender.com`
- **Health Check:** `https://your-app-name.onrender.com/actuator/health`
- **Stock API:** `https://your-app-name.onrender.com/api/stocks` (add your endpoints)

---

## 🎯 Important Notes

### Free Tier Limitations
- Service spins down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- 750 hours/month of runtime (enough for one service)

### Memory Configuration
- Set to 512MB max heap size (`-Xmx512m`)
- Suitable for free tier (512MB RAM)
- Adjust if upgrading to paid plan

### Build Time
- First build: 5-10 minutes
- Subsequent builds: 2-5 minutes (with caching)

---

## 🔐 Environment Variables

Set these in Render Dashboard under Environment tab:

| Variable | Description | Default |
|----------|-------------|---------|
| `SERVER_PORT` | Port for the application | `8080` |
| `STOCK_API_BASE_URL` | External stock API URL | `https://api.freeapi.app/api/v1/public/stocks` |
| `JAVA_TOOL_OPTIONS` | JVM memory settings | `-Xmx512m -Xms256m` |
| `SPRING_PROFILES_ACTIVE` | Spring profile | `production` |

---

## 🐛 Troubleshooting

### Build Fails
- Check Maven logs in Render dashboard
- Verify Java version (should be 17)
- Ensure all dependencies in `pom.xml` are accessible

### Application Won't Start
- Check that `server.port` uses `$PORT` environment variable
- Verify JAR file name matches in start command
- Review application logs in Render dashboard

### Health Check Fails
- Ensure Spring Boot Actuator is included
- Verify `/actuator/health` endpoint is accessible
- Check application.properties configuration

### Slow Response Times
- Free tier spins down after inactivity
- Consider upgrading to paid plan for always-on service
- Add keep-alive pings if needed

---

## 📈 Monitoring

Render provides built-in monitoring:
- **Metrics:** CPU, Memory, Network usage
- **Logs:** Real-time application logs
- **Events:** Deployment and scaling events

Access via Render Dashboard → Your Service → Metrics/Logs tabs

---

## 🚀 Upgrading

To upgrade from free tier:
1. Go to Service Settings
2. Choose a paid plan (starts at $7/month)
3. Benefits: Always-on, more memory, faster builds

---

## 📞 Support

- **Render Docs:** https://render.com/docs
- **Spring Boot Docs:** https://spring.io/projects/spring-boot
- **StockPulse Issues:** Create issue in your repository

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub/GitLab
- [ ] `render.yaml` in repository root
- [ ] Environment variables configured
- [ ] Service created on Render
- [ ] Build completed successfully
- [ ] Health check passing
- [ ] API endpoints tested
- [ ] CORS configured (if frontend on different domain)

---

**Your StockPulse backend is now ready for deployment! 🎉**

For any issues, check the troubleshooting section or Render logs.
