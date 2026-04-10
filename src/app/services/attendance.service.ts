import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface Attendance {
  id?: number;
  memberId: number;
  checkInTime: string;
  checkOutTime: string;
  member?: any; // assuming member object
}

export interface NewAttendance {
  memberId: number;
  checkInTime: string;
  checkOutTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private baseUrl = environment.apiBaseUrl;
  private endpoints = environment.endpoints.attendance;

  constructor(private http: HttpClient) {}

  getAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(
      `${this.baseUrl}/${this.endpoints.getAttendance}`
    );
  }

  saveAttendance(payload: NewAttendance): Observable<{ id: number; message: string }> {
    return this.http.post<{ id: number; message: string }>(
      `${this.baseUrl}/${this.endpoints.save}`,
      payload
    );
  }
}