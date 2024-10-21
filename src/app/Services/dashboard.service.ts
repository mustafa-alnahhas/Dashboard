import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { PageRequestDto, User, UserDetails } from '../Models/Dashboard';

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

  getUserDetailsById(id: number): Observable<any>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<UserDetails>(url).pipe(
      map((response: any) => {
        if(!response){
          return null;
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // handle error function
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.status === 404) {
      errorMessage = 'No data found!';
    } else {
      errorMessage = `Server error: ${error.status}`;
    }
    return of(null);
  }

  
}
