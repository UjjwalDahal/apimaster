const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const PORT = process.env.PORT || 5000;

// load env vars
dotenv.config({ path: './config/config.env' });

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`);
});
