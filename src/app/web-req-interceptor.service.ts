import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptorService {
  constructor() { }
}
