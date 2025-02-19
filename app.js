// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bookingRoutes = require('./src/routes/bookingRoutes');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use('/v1/bookings', bookingRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
