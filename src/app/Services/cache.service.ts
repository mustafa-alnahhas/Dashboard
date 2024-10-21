import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  /* This service will be used to cache http request and call it if it is called again */
  constructor() { }

  // cache is a hash, the key is a string for each request and the value is the data
  private cache: { [key: string]: any } = {};

  // setter, getter and checker 

  set(key: string, value: any): void {
    this.cache[key] = value;
  }

  get(key: string): any {
    return this.cache[key];
  }

  has(key: string): boolean {
    return this.cache.hasOwnProperty(key);
  }
}
