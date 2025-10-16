# Parental Control App

An AI-powered parental control application that monitors WhatsApp messages for inappropriate content and alerts parents in real-time.

## Architecture

- **Frontend (Mobile)**: React Native app for both parent and child
- **Frontend (Web Dashboard)**: Next.js dashboard for parents
- **Backend (API)**: Node.js + Express for authentication and data management
- **AI Content Filter**: Python + FastAPI for content analysis
- **Database**: MongoDB for data storage
- **Notifications**: Firebase Cloud Messaging for real-time alerts

## Quick Start (Mobile App Testing)

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (v16 or higher)
2. Install [Expo CLI](https://docs.expo.dev/get-started/installation/):
   ```bash
   npm install -g @expo/cli
   ```
3. Install [Expo Go](https://expo.dev/client) app on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Run the Mobile App
1. **Windows**: Double-click `start-mobile-app.bat`
2. **Mac/Linux**: Run `./start-mobile-app.sh`
3. **Manual**: 
   ```bash
   cd mobile-app
   npm install
   npm start
   ```
4. **Scan the QR code** with Expo Go app on your phone!

### Backend Setup (Optional for Full Features)
1. Install MongoDB and start it
2. Set up backend API:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. Set up AI filter service:
   ```bash
   cd ai-filter
   pip install -r requirements.txt
   python main.py
   ```

## Complete Setup Instructions

1. Install all dependencies:

```bash
npm run install:all
```

2. Set up environment variables (see individual component READMEs)

3. Start development servers:

```bash
# Terminal 1 - Backend API
npm run dev:backend

# Terminal 2 - AI Filter Service
npm run dev:ai

# Terminal 3 - Web Dashboard
npm run dev:dashboard

# Terminal 4 - Mobile App (Expo)
cd mobile-app && npm start
```

## Features

- Real-time WhatsApp message monitoring
- AI-powered content filtering for sexual and violent content
- Parent dashboard for monitoring flagged messages
- Secure authentication and user management
- Push notifications for immediate alerts

## Important Notes

- This app requires Android notification access permissions
- WhatsApp message monitoring works through notification listener API
- All data is encrypted and stored securely
- Parents must have explicit consent from children before monitoring

## Legal Compliance

Ensure compliance with local laws regarding:

- Privacy rights of minors
- Data protection regulations
- Notification and consent requirements
