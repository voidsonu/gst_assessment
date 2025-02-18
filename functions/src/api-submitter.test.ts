// api-submitter.test.ts
import axios from 'axios';
import { submitToGSTAPI } from './api-submitter';

jest.mock('axios');

describe('API Submission', () => {
  test('should submit booking data to API and return response', async () => {
    // Mocking the response of axios.post
    axios.post.mockResolvedValue({ data: { id: 1, name: 'John Doe' } });

    const bookingData = {
      name: 'John Doe',
      totalBookingAmount: 10000,
      gstAmount: 1800,
      gstType: 'SGST/CGST'
    };

    const response = await submitToGSTAPI(bookingData);

    // Assert that the response contains the expected data
    expect(response.id).toBe(1);
    expect(response.name).toBe('John Doe');
    expect(axios.post).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts',
      bookingData
    );
  });

  test('should throw error if API request fails', async () => {
    axios.post.mockRejectedValue(new Error('Failed to submit GST'));

    const bookingData = {
      name: 'John Doe',
      totalBookingAmount: 10000,
      gstAmount: 1800,
      gstType: 'SGST/CGST'
    };

    // Expecting an error to be thrown
    await expect(submitToGSTAPI(bookingData)).rejects.toThrow('Failed to submit GST to the API');
  });
});
