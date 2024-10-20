import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequestDto, User } from '../Models/Dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // the URL that will be called
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getUsersByPage(page: number): Observable<PageRequestDto> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<PageRequestDto>(url);
  }

  getUserDetailsById(id: number): Observable<User>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }
}
