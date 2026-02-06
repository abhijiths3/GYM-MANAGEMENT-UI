import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private baseUrl = environment.apiBaseUrl;
  private endpoints = environment.endpoints.members;

  constructor(private http: HttpClient){}

  getAllMembers(): Observable<Member[]>{
    return this.http.get<Member[]>(
      `${this.baseUrl}/${this.endpoints.getMembers}`
    );
  }

  //POST

  addMember(payload: Member): Observable<Member> {
    return this.http.post<Member>(
      `${this.baseUrl}/${this.endpoints.create}`,
      payload
    )
  }
}
  // private apiUrl = 'https://localhost:7189/api/members';
  // constructor(private http: HttpClient) { }
  // getAllMembers(): Observable<Member[]> {
  //   return this.http.get<Member[]>(this.apiUrl);
  // }
