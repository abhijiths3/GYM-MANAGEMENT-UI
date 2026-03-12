export interface Coupon {
  id?: string;
  title: string;
  description: string;
  code: string;
  discountPercent: number;
  expiryDate: string;
  frameName: string;
}