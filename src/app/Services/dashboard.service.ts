import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { PageRequestDto, User, UserDetails } from '../Models/Dashboard';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // the URL that will be called
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  getUsersByPage(page: number): Observable<PageRequestDto> {
    const cacheKey = `users_page_${page}`;
    // check if it is already called 
    if (this.cacheService.has(cacheKey)) {
      return this.cacheService.get(cacheKey);
    } 
    else{
      // else call http and save in cache
      const url = `${this.apiUrl}?page=${page}`;
      var data = this.http.get<PageRequestDto>(url);
      this.cacheService.set(cacheKey, data);
      return data;
    }
  }

  getUserDetailsById(id: number): Observable<any>{
    // debugger;
    const cacheKey = `user_${id}`;

    if (this.cacheService.has(cacheKey)) {
      return this.cacheService.get(cacheKey);
    } else {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<UserDetails>(url).pipe(
        map((response: any) => {
          if(!response){
            return null;
          }
          this.cacheService.set(cacheKey, of(response));
          return response;
        }),
        catchError(this.handleError)
      );
    }
  }

  // handle error function
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.status === 404) {
      errorMessage = 'No data found!';
    } else {
      errorMessage = `Server error: ${error.status}`;
    }
    // debugger;
    return of(null);
  }

  
}
