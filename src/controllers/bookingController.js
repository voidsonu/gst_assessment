const {
  createBooking,
  updateBookingStatus,
  getBookingById,
} = require("../models/bookingModel");
const { calculateGST, fileGSTWithAPI } = require("../services/gstService");

// Create a new booking
const createNewBooking = async (req, res) => {
  try {
    let bookingData = req.body;

    // Validate if 'name' and 'totalBookingAmount' are provided
    if (!bookingData?.name || !bookingData?.totalBookingAmount) {
      return res.status(400).json({ error: `'name' and 'totalBookingAmount' are mandatory fields.` });
    }

    // Add the default status as 'pending'
    bookingData = {
      ...bookingData,
      status: "pending"
    };

    // Create booking in the Firestore and get the bookingId
    const bookingId = await createBooking(bookingData);

    // Send success response with bookingId
    res.status(201).json({ message: "Booking created successfully", bookingId: bookingId.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle status update and GST calculation
const updateBookingStatusAndProcessGST = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    await updateBookingStatus(bookingId, status);

    if (status === "finished") {
      const bookingData = await getBookingById(bookingId);
      if (bookingData) {
        const { totalBookingAmount } = bookingData;
        const { GSTAmount, IGST, SGST } = calculateGST(totalBookingAmount);
        await fileGSTWithAPI(bookingData, GSTAmount, IGST, SGST);
        res.status(200).json({ message: "GST filed successfully" });
      } else {
        res.status(404).json({ message: "Booking not found" });
      }
    } else {
      res.status(200).json({ message: "Status updated" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNewBooking, updateBookingStatusAndProcessGST };
