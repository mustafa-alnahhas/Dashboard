import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable()
/* this service will be used to check when the api call will be called 
    and when it will be ended with the help of loader interceptor */
export class LoaderService {
    // a subject with initial value
    public isLoading = new BehaviorSubject(false);

    constructor() {}
}


