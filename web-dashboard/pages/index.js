import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { dbHelpers } from '../lib/supabase';

// Modern UI Components
const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl ${className}`} {...props}>
    {children}
  </div>
);

const StatCard = ({ icon, title, value, change, color, trend }) => (
  <Card className="hover:scale-105 transition-all duration-300 cursor-pointer">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
        <span className="text-2xl">{icon}</span>
      </div>
      {trend && (
        <div className={`text-sm font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
        </div>
      )}
    </div>
    <h3 className="text-white/80 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
    {change && (
      <p className="text-xs text-white/60 mt-1">{change}</p>
    )}
  </Card>
);

const ActivityItem = ({ activity, index }) => (
  <div className={`flex items-center p-4 rounded-xl hover:bg-white/5 transition-colors ${index > 0 ? 'border-t border-white/10' : ''}`}>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
      activity.risk_level === 'high' ? 'bg-red-500/20 text-red-400' :
      activity.risk_level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
      'bg-green-500/20 text-green-400'
    }`}>
      <span className="text-xl">
        {activity.risk_level === 'high' ? '⚠️' : 
         activity.risk_level === 'medium' ? '⚡' : '✅'}
      </span>
    </div>
    <div className="flex-1">
      <h4 className="text-white font-semibold mb-1">{activity.activity_type}</h4>
      <p className="text-white/60 text-sm">{activity.content?.substring(0, 50)}...</p>
      <p className="text-white/40 text-xs mt-1">
        {new Date(activity.created_at).toLocaleString()}
      </p>
    </div>
    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
      activity.status === 'blocked' ? 'bg-red-500/20 text-red-400' :
      activity.status === 'allowed' ? 'bg-green-500/20 text-green-400' :
      'bg-blue-500/20 text-blue-400'
    }`}>
      {activity.status}
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description, onClick }) => (
  <Card 
    className="hover:scale-105 transition-all duration-300 cursor-pointer group"
    onClick={onClick}
  >
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-white/70 text-sm leading-relaxed">{description}</p>
    </div>
  </Card>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalActivities: 0,
    blockedContent: 0,
    activeFilters: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load users
      const { data: users } = await dbHelpers.getUsers();
      
      // Load activities
      const { data: activities } = await dbHelpers.getActivities();
      
      // Load filter results
      const { data: filterResults } = await dbHelpers.getFilterResults();
      
      // Calculate stats
      const blockedCount = filterResults?.filter(r => r.filter_action === 'block').length || 0;
      
      setStats({
        totalUsers: users?.length || 0,
        totalActivities: activities?.length || 0,
        blockedContent: blockedCount,
        activeFilters: 1 // AI filter is always active
      });
      
      // Set recent activities (last 5)
      setRecentActivities(activities?.slice(0, 5) || []);
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Guardian.AI Dashboard</title>
        <meta name="description" content="AI-powered parental control dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-sans">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">🛡️</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Guardian.AI</h1>
                  <p className="text-white/60 text-sm">Parental Control Dashboard</p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center space-x-1">
                <a href="#" className="px-4 py-2 rounded-lg bg-white/20 text-white font-medium">Dashboard</a>
                <a href="#" className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">Monitoring</a>
                <a href="#" className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">Settings</a>
                <a href="#" className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">Reports</a>
              </nav>
              
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">👤</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
              Welcome to Guardian.AI
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Monitor and protect your children's digital activities with AI-powered insights and real-time monitoring
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon="👥"
              title="Total Users"
              value={loading ? '...' : stats.totalUsers}
              change="+12% this month"
              color="bg-blue-500"
              trend={12}
            />
            <StatCard
              icon="📊"
              title="Activities"
              value={loading ? '...' : stats.totalActivities}
              change="Real-time monitoring"
              color="bg-green-500"
              trend={8}
            />
            <StatCard
              icon="🚫"
              title="Blocked Content"
              value={loading ? '...' : stats.blockedContent}
              change="AI filtered"
              color="bg-red-500"
              trend={-5}
            />
            <StatCard
              icon="🤖"
              title="AI Filters"
              value={loading ? '...' : stats.activeFilters}
              change="Always active"
              color="bg-purple-500"
              trend={0}
            />
          </div>

          {/* Recent Activities Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white text-center mb-8">Recent Activities</h3>
            <Card>
              {loading ? (
                <div className="text-center text-white/80 py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
                  Loading activities...
                </div>
              ) : recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <ActivityItem key={activity.id || index} activity={activity} index={index} />
                ))
              ) : (
                <div className="text-center text-white/80 py-8">
                  <div className="text-4xl mb-4">📭</div>
                  No recent activities
                </div>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white text-center mb-8">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon="📊"
                title="Real-time Monitoring"
                description="Monitor WhatsApp activity in real-time with instant alerts and notifications"
                onClick={() => console.log('Navigate to monitoring')}
              />
              <FeatureCard
                icon="🧠"
                title="AI Content Analysis"
                description="Advanced AI filters detect and block inappropriate content automatically"
                onClick={() => console.log('Navigate to AI settings')}
              />
              <FeatureCard
                icon="📈"
                title="Detailed Reports"
                description="Comprehensive activity reports with insights and analytics"
                onClick={() => console.log('Navigate to reports')}
              />
              <FeatureCard
                icon="⚙️"
                title="Custom Controls"
                description="Personalized parental control settings for each child"
                onClick={() => console.log('Navigate to settings')}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}