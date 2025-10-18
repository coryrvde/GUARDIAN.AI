import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Animated,
  RefreshControl
} from "react-native";
import { dbHelpers } from './lib/supabase';

// Modern UI Components
const ModernCard = ({ children, style, ...props }) => (
  <View style={[styles.modernCard, style]} {...props}>
    {children}
  </View>
);

const StatCard = ({ icon, title, value, change, color, trend, onPress }) => (
  <TouchableOpacity style={[styles.statCard, { borderLeftColor: color }]} onPress={onPress}>
    <View style={styles.statHeader}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        <Text style={styles.statIconText}>{icon}</Text>
      </View>
      {trend !== undefined && (
        <View style={[styles.trendIndicator, { backgroundColor: trend > 0 ? '#4ade80' : '#ef4444' }]}>
          <Text style={styles.trendText}>
            {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
          </Text>
        </View>
      )}
    </View>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
    {change && <Text style={styles.statChange}>{change}</Text>}
  </TouchableOpacity>
);

const ActivityItem = ({ activity, index }) => (
  <View style={[styles.activityItem, index > 0 && styles.activityItemBorder]}>
    <View style={[
      styles.activityIcon,
      { backgroundColor: activity.risk_level === 'high' ? '#ef444420' : 
                       activity.risk_level === 'medium' ? '#f59e0b20' : '#4ade8020' }
    ]}>
      <Text style={[
        styles.activityIconText,
        { color: activity.risk_level === 'high' ? '#ef4444' : 
                 activity.risk_level === 'medium' ? '#f59e0b' : '#4ade80' }
      ]}>
        {activity.risk_level === 'high' ? '⚠️' : 
         activity.risk_level === 'medium' ? '⚡' : '✅'}
      </Text>
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityTitle}>{activity.activity_type}</Text>
      <Text style={styles.activityDescription} numberOfLines={2}>
        {activity.content?.substring(0, 50)}...
      </Text>
      <Text style={styles.activityTime}>
        {new Date(activity.created_at).toLocaleString()}
      </Text>
    </View>
    <View style={[
      styles.activityStatus,
      { backgroundColor: activity.status === 'blocked' ? '#ef444420' : 
                        activity.status === 'allowed' ? '#4ade8020' : '#3b82f620' }
    ]}>
      <Text style={[
        styles.activityStatusText,
        { color: activity.status === 'blocked' ? '#ef4444' : 
                 activity.status === 'allowed' ? '#4ade80' : '#3b82f6' }
      ]}>
        {activity.status}
      </Text>
    </View>
  </View>
);

const FeatureCard = ({ icon, title, description, onPress }) => (
  <TouchableOpacity style={styles.featureCard} onPress={onPress}>
    <View style={styles.featureIconContainer}>
      <Text style={styles.featureIcon}>{icon}</Text>
    </View>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </TouchableOpacity>
);

const { width } = Dimensions.get('window');

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalActivities: 0,
    blockedContent: 0,
    activeFilters: 1
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
        activeFilters: 1
      });
      
      // Set recent activities (last 3)
      setRecentActivities(activities?.slice(0, 3) || []);
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };


  const TabButton = ({ id, title, icon, isActive, onPress }) => (
    <TouchableOpacity 
      style={[styles.tabButton, isActive && styles.activeTabButton]} 
      onPress={() => onPress(id)}
    >
      <Text style={[styles.tabIcon, isActive && styles.activeTabIcon]}>{icon}</Text>
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoIconText}>🛡️</Text>
            </View>
            <View>
              <Text style={styles.logo}>Guardian.AI</Text>
              <Text style={styles.logoSubtitle}>Parental Control</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <View style={styles.statusIndicator}>
              <View style={styles.statusDot} />
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'dashboard' && (
          <>
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeTitle}>Welcome Back!</Text>
              <Text style={styles.welcomeSubtitle}>Monitor your child's digital safety with AI-powered insights</Text>
            </View>

            {/* Status Cards */}
            <View style={styles.statusSection}>
              <Text style={styles.sectionTitle}>System Status</Text>
              <View style={styles.statusGrid}>
                <StatCard
                  icon="👥"
                  title="Total Users"
                  value={loading ? "..." : stats.totalUsers.toString()}
                  change="+12% this month"
                  color="#3b82f6"
                  trend={12}
                />
                <StatCard
                  icon="📊"
                  title="Activities"
                  value={loading ? "..." : stats.totalActivities.toString()}
                  change="Real-time monitoring"
                  color="#4ade80"
                  trend={8}
                />
                <StatCard
                  icon="🚫"
                  title="Blocked Content"
                  value={loading ? "..." : stats.blockedContent.toString()}
                  change="AI filtered"
                  color="#ef4444"
                  trend={-5}
                />
                <StatCard
                  icon="🤖"
                  title="AI Filters"
                  value={loading ? "..." : stats.activeFilters.toString()}
                  change="Always active"
                  color="#8b5cf6"
                  trend={0}
                />
              </View>
            </View>

            {/* Features Grid */}
            <View style={styles.featuresSection}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.featuresGrid}>
                <FeatureCard
                  icon="📊"
                  title="Activity Monitor"
                  description="View real-time activity and monitoring dashboard"
                  onPress={() => setActiveTab('monitoring')}
                />
                <FeatureCard
                  icon="🧠"
                  title="AI Analysis"
                  description="Advanced content filtering and AI insights"
                  onPress={() => console.log('Navigate to AI analysis')}
                />
                <FeatureCard
                  icon="📈"
                  title="Reports"
                  description="Detailed analytics and comprehensive reports"
                  onPress={() => setActiveTab('reports')}
                />
                <FeatureCard
                  icon="⚙️"
                  title="Settings"
                  description="Configure parental controls and preferences"
                  onPress={() => setActiveTab('settings')}
                />
              </View>
            </View>

            {/* Recent Activity */}
            <View style={styles.activitySection}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <ModernCard style={styles.activityCard}>
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <View style={styles.loadingSpinner} />
                    <Text style={styles.loadingText}>Loading activities...</Text>
                  </View>
                ) : recentActivities.length > 0 ? (
                  recentActivities.map((activity, index) => (
                    <ActivityItem key={activity.id || index} activity={activity} index={index} />
                  ))
                ) : (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>📭</Text>
                    <Text style={styles.emptyTitle}>No recent activities</Text>
                    <Text style={styles.emptySubtitle}>Activities will appear here as they occur</Text>
                  </View>
                )}
              </ModernCard>
            </View>
          </>
        )}

        {activeTab === 'monitoring' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Real-time Monitoring</Text>
            <Text style={styles.tabDescription}>Monitor WhatsApp activity in real-time</Text>
          </View>
        )}

        {activeTab === 'reports' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Activity Reports</Text>
            <Text style={styles.tabDescription}>View detailed activity reports and insights</Text>
          </View>
        )}

        {activeTab === 'settings' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Settings</Text>
            <Text style={styles.tabDescription}>Configure parental control settings</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TabButton 
          id="dashboard" 
          title="Dashboard" 
          icon="🏠" 
          isActive={activeTab === 'dashboard'} 
          onPress={setActiveTab} 
        />
        <TabButton 
          id="monitoring" 
          title="Monitor" 
          icon="👁️" 
          isActive={activeTab === 'monitoring'} 
          onPress={setActiveTab} 
        />
        <TabButton 
          id="reports" 
          title="Reports" 
          icon="📊" 
          isActive={activeTab === 'reports'} 
          onPress={setActiveTab} 
        />
        <TabButton 
          id="settings" 
          title="Settings" 
          icon="⚙️" 
          isActive={activeTab === 'settings'} 
          onPress={setActiveTab} 
        />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    marginTop: 20,
  },
  statusSection: {
    marginBottom: 20,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusCard: {
    width: (width - 60) / 2,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  statusIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  featuresSection: {
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 60) / 2,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 16,
  },
  activitySection: {
    marginBottom: 20,
  },
  activityCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  activityIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  activityStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4ade80',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  tabTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  tabDescription: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingVertical: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTabButton: {
    backgroundColor: '#3b82f6',
    marginHorizontal: 5,
    borderRadius: 8,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
    color: '#94a3b8',
  },
  activeTabIcon: {
    color: '#ffffff',
  },
  tabText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#ffffff',
  },
  // Modern UI Styles
  modernCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderColor: '#3b82f6',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIconText: {
    fontSize: 24,
  },
  trendIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  statTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  activityItemBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityIconText: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  activityStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activityStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingSpinner: {
    width: 32,
    height: 32,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderTopColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
});
