// models/bookingModel.js
const { db } = require('../configs/firebaseConfig');

// Create a booking document in Firestore
const createBooking = async (bookingData) => {
  try {
    const bookingRef = db.collection('bookings').doc();
    await bookingRef.set(bookingData); 
    return bookingRef;
  } catch (error) {
    throw new Error("Error creating booking: " + error.message);
  }
};

// Update the status of a booking
const updateBookingStatus = async (bookingId, status) => {
  const bookingRef = db.collection('bookings').doc(bookingId);
  await bookingRef.update({ status });
};

// Get a booking by ID
const getBookingById = async (bookingId) => {
  const bookingRef = db.collection('bookings').doc(bookingId);
  const bookingDoc = await bookingRef.get();
  return bookingDoc.exists ? bookingDoc.data() : null;
};

module.exports = {
  createBooking,
  updateBookingStatus,
  getBookingById
};
