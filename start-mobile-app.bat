@echo off
echo 🚀 Starting Parental Control Mobile App...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Expo CLI is installed
expo --version >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing Expo CLI...
    npm install -g @expo/cli
)

REM Navigate to mobile app directory
cd mobile-app

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

echo.
echo 🔧 Configuration Check:
echo    - Make sure your backend API is running on http://localhost:3000
echo    - Make sure your AI filter service is running on http://localhost:8001
echo.

REM Start the Expo development server
echo 🌟 Starting Expo development server...
echo    - Open Expo Go app on your phone
echo    - Scan the QR code that appears
echo    - Or press 'i' for iOS simulator, 'a' for Android emulator
echo.

expo start --clear

echo.
echo ✅ Mobile app started successfully!
echo 📱 Scan the QR code with Expo Go app to test on your phone
pause
