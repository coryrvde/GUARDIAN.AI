# Guardian.AI Supabase Database Setup

## 🚀 Quick Setup Guide

### 1. Access Supabase Dashboard

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account
3. Select your project: `kxmqozczlmuxjousvvvs`

### 2. Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire content from `database-schema.sql`
4. Click **Run** to execute the SQL

### 3. Verify Tables Created

After running the SQL, you should see these tables in the **Table Editor**:

- `users`
- `parental_settings`
- `activities`
- `filter_results`
- `notifications`
- `reports`

### 4. Test the Integration

Once tables are created, run:

```bash
node setup-database.js
```

This will populate your database with sample data.

## 📊 Database Schema Overview

### Users Table

- Stores parent and child user accounts
- Roles: parent, child, admin
- Includes contact information

### Activities Table

- Tracks all monitored activities
- Risk levels: low, medium, high, critical
- Status: pending, reviewed, blocked, allowed

### Filter Results Table

- AI analysis results
- Confidence scores and categories
- Filter actions: allow, block, flag, review

### Parental Settings Table

- Configuration for each child
- Time restrictions and blocked contacts
- Alert preferences

### Notifications Table

- Real-time alerts for parents
- Different types: info, warning, alert, blocked

### Reports Table

- Analytics and insights
- Time-based activity summaries

## 🔧 Configuration

### Environment Variables

The following are already configured in your project:

- **Supabase URL**: `https://kxmqozczlmuxjousvvvs.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### API Endpoints

Your backend now includes these Supabase-powered endpoints:

- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `GET /api/activities` - List activities
- `POST /api/activities` - Log new activity
- `GET /api/filter-results` - Get AI filter results
- `POST /api/filter-results` - Save filter result
- `GET /api/settings` - Get parental settings
- `POST /api/settings` - Update settings

## 🎯 Next Steps

1. **Run the SQL schema** in Supabase dashboard
2. **Execute setup script**: `node setup-database.js`
3. **Test your applications**:
   - Web Dashboard: http://localhost:3001
   - Mobile App: http://localhost:8082
   - Backend API: http://localhost:3000

## 🛠️ Troubleshooting

### Tables Not Found Error

- Make sure you've run the `database-schema.sql` in Supabase
- Check that you're in the correct project
- Verify the tables appear in the Table Editor

### Connection Issues

- Verify your Supabase URL and anon key are correct
- Check that your project is active in Supabase
- Ensure RLS policies are properly configured

### Sample Data Issues

- Run `node setup-database.js` after creating tables
- Check the console for any error messages
- Verify data appears in Supabase Table Editor

## 📱 Features Enabled

With Supabase integration, your Guardian.AI app now has:

- ✅ Real-time data synchronization
- ✅ User management
- ✅ Activity monitoring
- ✅ AI filter result storage
- ✅ Parental control settings
- ✅ Notification system
- ✅ Analytics and reporting

Your applications will now display real data from the database instead of static content!
