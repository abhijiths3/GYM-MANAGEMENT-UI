import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../models/coupon.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private baseUrl = environment.apiBaseUrl;
  private endpoints = environment.endpoints.coupons;

  constructor(private http: HttpClient) { }

  // Calls the AI generation endpoint
  generateAiDraft(vibe: string): Observable<Coupon> {
    return this.http.post<Coupon>(
      `${this.baseUrl}/${this.endpoints.generate}`,
      { vibe }
    );
  }

  // Saves the final (edited) coupon to SQL
  saveCoupon(payload: Coupon): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${this.endpoints.save}`,
      payload
    );
  }

  // Gets the history of saved coupons
  getHistory(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(
      `${this.baseUrl}/${this.endpoints.getAllCoupons}`
    );
  }
}