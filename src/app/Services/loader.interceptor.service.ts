import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';


@Injectable()
/* this interceptor will be used to check the status of http requests (to be used in spinner for every component)*/
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService) { }

  // This code will run with every Http Request
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("start of request");
    
    this.loaderService.isLoading.next(true);
    return next.handle(req).pipe(
      finalize(() => {this.loaderService.isLoading.next(false); console.log("end of request");
      })
    );
}

}
