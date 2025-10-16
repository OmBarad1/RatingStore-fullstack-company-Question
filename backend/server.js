const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Sequelize instance
const { sequelize } = require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
const ratingRoutes = require('./routes/ratingRoutes');


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);


const PORT = process.env.PORT || 5000;

(async () => {
  try {
    sequelize.sync({ force: false }); // create/update tables
    console.log('Database synced successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Sync error:', err);
  }
})();
