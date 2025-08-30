const express = require('express');
const cors = require('cors');
const availabilityRoutes = require('./routes/availability');
const bookingRoutes = require('./routes/bookings');
const adminRoutes = require('./routes/admin');

const app = express();

// Construct DATABASE_URL from environment variables if not provided
if (!process.env.DATABASE_URL && process.env.DB_HOST) {
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = process.env.DB_PORT || '5432';
  const dbName = process.env.DB_NAME || 'eventbookingdb';
  const dbUser = process.env.DB_USERNAME || 'postgres';
  const dbPassword = process.env.DB_PASSWORD || '';
  const sslMode = process.env.SSL === 'disable' ? 'disable' : 'prefer';
  
  process.env.DATABASE_URL = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?sslmode=${sslMode}`;
  console.log('DATABASE_URL constructed from environment variables');
}

// Set up EJS as template engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/availability', availabilityRoutes);
app.use('/book', bookingRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
