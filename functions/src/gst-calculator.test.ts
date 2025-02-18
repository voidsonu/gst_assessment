// gst-calculator.test.ts
import { calculateGST } from './gst-calculator';

describe('GST Calculation', () => {
  test('should calculate GST for total amount of 10000 correctly', () => {
    const result = calculateGST(10000);
    expect(result.gstAmount).toBe(1800);  // 18% of 10000 is 1800
    expect(result.gstType).toBe('SGST/CGST');  // Intra-state
  });

  test('should calculate GST for total amount of 5000 correctly', () => {
    const result = calculateGST(5000);
    expect(result.gstAmount).toBe(900);  // 18% of 5000 is 900
    expect(result.gstType).toBe('SGST/CGST');
  });
});
