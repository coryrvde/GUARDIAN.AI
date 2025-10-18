import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kxmqozczlmuxjousvvvs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bXFvemN6bG11eGpvdXN2dnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDI4NTgsImV4cCI6MjA3NjI3ODg1OH0.uxMMjKda1bhvLDW58YZ4M4dRPFGK6KHhfL_-DP7Ur2k'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions for mobile app
export const dbHelpers = {
  // Users
  async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Activities
  async getActivities() {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async createActivity(activityData) {
    const { data, error } = await supabase
      .from('activities')
      .insert([activityData])
      .select()
    return { data, error }
  },

  // Filter Results
  async getFilterResults() {
    const { data, error } = await supabase
      .from('filter_results')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Notifications
  async getNotifications() {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async markNotificationAsRead(notificationId) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
    return { data, error }
  }
}
