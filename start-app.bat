@echo off
echo 🚀 Starting Guardian.AI Application...
echo.

echo 🔧 Starting Backend API...
start "Backend API" cmd /k "cd /d C:\Users\kandi\OneDrive\Desktop\YEAR 4\GUARDIAN.AI\backend && npm run dev"

timeout /t 3 /nobreak >nul

echo 🤖 Starting AI Filter Service...
start "AI Filter" cmd /k "cd /d C:\Users\kandi\OneDrive\Desktop\YEAR 4\GUARDIAN.AI\ai-filter && python -m uvicorn main:app --reload --port 8001"

timeout /t 3 /nobreak >nul

echo 🌐 Starting Web Dashboard...
start "Web Dashboard" cmd /k "cd /d C:\Users\kandi\OneDrive\Desktop\YEAR 4\GUARDIAN.AI\web-dashboard && npm run dev"

timeout /t 3 /nobreak >nul

echo 📱 Starting Mobile App...
start "Mobile App" cmd /k "cd /d C:\Users\kandi\OneDrive\Desktop\YEAR 4\GUARDIAN.AI\mobile-app && npx expo start --web --port 8082"

echo.
echo 🎉 All services are starting in separate windows!
echo.
echo 📱 Access your applications:
echo • Web Dashboard: http://localhost:3001
echo • Mobile App: http://localhost:8082
echo • Backend API: http://localhost:3000
echo • AI Filter: http://localhost:8001
echo.
pause
