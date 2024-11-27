const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const SERVER_PORT = process.env.PORT || 8000;
const mongo_URI = process.env.MONGO_URI;

const app = express();

const corsOptions = {
  origin: 'https://101427440-comp3123-assignment2-reactjs.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,
};

app.use(cors(corsOptions));

(async () => {
  try {
      if (!mongo_URI) {
          throw new Error('MONGO_URI not found');
      }
      
      await mongoose.connect(mongo_URI);
      console.log('MongoDB connected successfully');
  } catch (err) {
      console.error('MongoDB connection failed:', err.message);
      process.exit(1);
  }
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routes/userRoutes');
const empRouter = require('./routes/empRoutes');

app.use('/api/v1/user', userRouter);
app.use('/api/v1/emp', empRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

module.exports = app;