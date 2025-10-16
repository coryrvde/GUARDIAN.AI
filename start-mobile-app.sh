#!/bin/bash

# Parental Control App - Mobile App Startup Script

echo "🚀 Starting Parental Control Mobile App..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli
fi

# Navigate to mobile app directory
cd mobile-app

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "🔧 Configuration Check:"
echo "   - Make sure your backend API is running on http://localhost:3000"
echo "   - Make sure your AI filter service is running on http://localhost:8001"
echo ""

# Start the Expo development server
echo "🌟 Starting Expo development server..."
echo "   - Open Expo Go app on your phone"
echo "   - Scan the QR code that appears"
echo "   - Or press 'i' for iOS simulator, 'a' for Android emulator"
echo ""

expo start --clear

echo ""
echo "✅ Mobile app started successfully!"
echo "📱 Scan the QR code with Expo Go app to test on your phone"
