import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../models/coupon.model';

@Injectable({ providedIn: 'root' })
export class CouponService {
  private apiUrl = 'https://localhost:7189/api/coupons'; // Your .NET API Port

  constructor(private http: HttpClient) {}

  // Calls the AI generation endpoint
  generateAiDraft(vibe: string): Observable<Coupon> {
    return this.http.post<Coupon>(`${this.apiUrl}/generate`, { vibe });
  }

  // Saves the final (edited) coupon to SQL
  saveCoupon(coupon: Coupon): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, coupon);
  }

  // Gets the history of saved coupons
  getHistory(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.apiUrl);
  }
}