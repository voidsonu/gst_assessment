const axios = require("axios");

// Function to calculate GST and split it into IGST and SGST/CGST
const calculateGST = (totalAmount) => {
  const GST_SLAB = 18; // 18% GST slab
  const GSTAmount = totalAmount * (GST_SLAB / 100);
  const IGST = GSTAmount / 2; // IGST for interstate transactions
  const SGST = IGST; // SGST for intrastate transactions (can be modified based on requirements)
  return { GSTAmount, IGST, SGST };
};

// API Integration for filing GST
const fileGSTWithAPI = async (bookingData, GSTAmount, IGST, SGST) => {
  const apiUrl = "https://api.gstn.gov.in/file-gst"; // Placeholder API endpoint
  const requestPayload = {
    bookingId: bookingData.bookingId,
    name: bookingData.name,
    totalAmount: bookingData.totalBookingAmount,
    GSTAmount: GSTAmount,
    IGST: IGST,
    SGST: SGST,
  };

  try {
    const response = await axios.post(apiUrl, requestPayload, {
      headers: {
        Authorization: `Bearer ${process.env.GST_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error filing GST: " + error.message);
  }
};

module.exports = { calculateGST, fileGSTWithAPI };
