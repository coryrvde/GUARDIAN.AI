const express = require("express");
const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_ANON_KEY } = require('../supabase-config');

const app = express();
const port = 3000;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Guardian.AI Backend API running",
    status: "healthy",
    database: "connected"
  });
});

// Database health check
app.get("/health", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      res.status(500).json({ 
        status: "unhealthy", 
        database: "disconnected",
        error: error.message 
      });
    } else {
      res.json({ 
        status: "healthy", 
        database: "connected",
        supabase: "operational"
      });
    }
  } catch (err) {
    res.status(500).json({ 
      status: "unhealthy", 
      database: "error",
      error: err.message 
    });
  }
});

// User management endpoints
app.get("/api/users", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([req.body])
      .select();
    
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Activity monitoring endpoints
app.get("/api/activities", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/activities", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .insert([req.body])
      .select();
    
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AI filter results endpoints
app.get("/api/filter-results", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('filter_results')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/filter-results", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('filter_results')
      .insert([req.body])
      .select();
    
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Parental control settings endpoints
app.get("/api/settings", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('parental_settings')
      .select('*');
    
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/settings", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('parental_settings')
      .upsert([req.body])
      .select();
    
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Guardian.AI Backend listening on port ${port}`);
  console.log(`Supabase connected to: ${SUPABASE_URL}`);
});
