// Database Setup Script for Guardian.AI
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://kxmqozczlmuxjousvvvs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bXFvemN6bG11eGpvdXN2dnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDI4NTgsImV4cCI6MjA3NjI3ODg1OH0.uxMMjKda1bhvLDW58YZ4M4dRPFGK6KHhfL_-DP7Ur2k';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function setupDatabase() {
  console.log('🚀 Setting up Guardian.AI database...');
  
  try {
    // Insert sample users
    console.log('📝 Creating sample users...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .insert([
        {
          email: 'parent@guardian.ai',
          name: 'John Parent',
          role: 'parent',
          phone: '+1234567890'
        },
        {
          email: 'child@guardian.ai',
          name: 'Jane Child',
          role: 'child',
          phone: '+1234567891'
        }
      ])
      .select();

    if (usersError) {
      console.log('⚠️ Users might already exist:', usersError.message);
    } else {
      console.log('✅ Sample users created:', users.length);
    }

    // Insert sample activities
    console.log('📊 Creating sample activities...');
    const { data: activities, error: activitiesError } = await supabase
      .from('activities')
      .insert([
        {
          user_id: users?.[0]?.id || '00000000-0000-0000-0000-000000000000',
          activity_type: 'WhatsApp Message',
          platform: 'whatsapp',
          content: 'Hello, how are you?',
          risk_level: 'low',
          status: 'allowed'
        },
        {
          user_id: users?.[0]?.id || '00000000-0000-0000-0000-000000000000',
          activity_type: 'Content Scanned',
          platform: 'whatsapp',
          content: 'Inappropriate content detected',
          risk_level: 'high',
          status: 'blocked'
        },
        {
          user_id: users?.[0]?.id || '00000000-0000-0000-0000-000000000000',
          activity_type: 'Image Shared',
          platform: 'whatsapp',
          content: 'Family photo',
          risk_level: 'low',
          status: 'allowed'
        }
      ])
      .select();

    if (activitiesError) {
      console.log('⚠️ Activities might already exist:', activitiesError.message);
    } else {
      console.log('✅ Sample activities created:', activities.length);
    }

    // Insert sample filter results
    console.log('🤖 Creating sample filter results...');
    const { data: filterResults, error: filterError } = await supabase
      .from('filter_results')
      .insert([
        {
          activity_id: activities?.[0]?.id || '00000000-0000-0000-0000-000000000000',
          content_analyzed: 'Hello, how are you?',
          ai_confidence: 0.95,
          categories_detected: ['safe'],
          is_inappropriate: false,
          filter_action: 'allow',
          ai_model_version: 'v1.0',
          processing_time_ms: 150
        },
        {
          activity_id: activities?.[1]?.id || '00000000-0000-0000-0000-000000000000',
          content_analyzed: 'Inappropriate content detected',
          ai_confidence: 0.88,
          categories_detected: ['inappropriate', 'adult'],
          is_inappropriate: true,
          filter_action: 'block',
          ai_model_version: 'v1.0',
          processing_time_ms: 200
        }
      ])
      .select();

    if (filterError) {
      console.log('⚠️ Filter results might already exist:', filterError.message);
    } else {
      console.log('✅ Sample filter results created:', filterResults.length);
    }

    // Insert sample notifications
    console.log('🔔 Creating sample notifications...');
    const { data: notifications, error: notificationsError } = await supabase
      .from('notifications')
      .insert([
        {
          user_id: users?.[0]?.id || '00000000-0000-0000-0000-000000000000',
          title: 'Content Blocked',
          message: 'Inappropriate content was blocked from your child\'s device',
          type: 'alert',
          is_read: false
        },
        {
          user_id: users?.[0]?.id || '00000000-0000-0000-0000-000000000000',
          title: 'Daily Report',
          message: 'Your child\'s activity summary is ready',
          type: 'info',
          is_read: false
        }
      ])
      .select();

    if (notificationsError) {
      console.log('⚠️ Notifications might already exist:', notificationsError.message);
    } else {
      console.log('✅ Sample notifications created:', notifications.length);
    }

    console.log('🎉 Database setup completed successfully!');
    console.log('📊 You can now view real data in your dashboard and mobile app.');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    console.log('💡 Make sure to run the database-schema.sql in your Supabase SQL editor first.');
  }
}

// Run the setup
setupDatabase();
