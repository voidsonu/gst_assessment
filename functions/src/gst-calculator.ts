// gst-calculator.ts

export function calculateGST(totalBookingAmount: number): {
  gstAmount: number;
  gstType: string;
} {
  const gstRate = 18; // 18% GST
  const gstAmount = (totalBookingAmount * gstRate) / 100;

  // For simplicity, assume intra-state (SGST/CGST)
  const gstType = "SGST/CGST"; // Or "IGST" for inter-state if needed

  return {
    gstAmount,
    gstType,
  };
}
