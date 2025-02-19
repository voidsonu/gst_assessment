const express = require("express");
const {
  createNewBooking,
  updateBookingStatusAndProcessGST,
} = require("../controllers/bookingController");

const router = express.Router();

// Route to create a new booking
router.post("/create", createNewBooking);

// Route to update booking status and process GST
router.post("/update-status", updateBookingStatusAndProcessGST);

module.exports = router;
