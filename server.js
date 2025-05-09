const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

// Server & DB
const PORT = process.env.PORT || 8000;
db.sync()
  .then(() => {
    console.log(' DB Connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('DB connection error: ', err));
