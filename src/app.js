const express = require('express');

const app = express();
const dotenv = require('dotenv');

const connectDatabase = require('./database/database');
const errorMiddleware = require('./middlewares/errors');

// Setting up config.env file variables
dotenv.config({ path: './config.env' });

// Connecting to database
connectDatabase();

// Setting up body parser
app.use(express.json());

// Importing routes
const jobs = require('./routes/jobs');

app.use('/api/v1', jobs);

// Middleware to handle errors

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} node.`);
});