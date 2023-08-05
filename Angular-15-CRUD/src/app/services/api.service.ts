import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/register.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  put(userIdToUpdate: number) {
    throw new Error('Method not implemented.');
  }
  private baseUrl: string = 'http://localhost:3000/enquiryList';

  constructor(private http: HttpClient) {}

  postRegisteredUser(registerObj: User) {
    return this.http.post<User[]>(`${this.baseUrl}`, registerObj);
  }

  getRegisteredUser() {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  updateRegisterUser(registerObj: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj);
  }

  deleteRegistered(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }

  getRegisteredUserId(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
