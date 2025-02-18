    // api-submitter.ts
import axios from 'axios';

export async function submitToGSTAPI(bookingData: any) {
  const gstApiUrl = 'https://jsonplaceholder.typicode.com/posts';

  try {
    const response = await axios.post(gstApiUrl, {
      name: bookingData.name,
      totalBookingAmount: bookingData.totalBookingAmount,
      gstAmount: bookingData.gstAmount,
      gstType: bookingData.gstType
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to submit GST to the API');
  }
}
