import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpRequestsService } from './http-requests.service';
import { shareReplay,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  readonly ROOT_URL;
  constructor(private http:HttpClient,private webService:HttpRequestsService,private router:Router) {
      this.ROOT_URL = 'http://localhost:3000';
   }
  
  register(email:string,password:string){
    return this.webService.register(email,password).pipe(
      shareReplay(),
      tap((res:HttpResponse<any>)=>{
      this.setSession(res.headers.get('x-user-id'),res.headers.get('x-access-token'),res.headers.get('x-refresh-token'))
      console.log('Regsitered');
      })
    )
  }

  login(email:string,password:string){
    return this.webService.login(email,password).pipe(
      shareReplay(),
      tap((res:HttpResponse<any>)=>{
      this.setSession(res.headers.get('x-user-id'),res.headers.get('x-access-token'),res.headers.get('x-refresh-token'))
      console.log('Logged in');
      })
    )
  }
  
  logout(){
    this.remSession();
    this.router.navigate(['/login']);
  }

  private setSession(userId:string,accessToken:string,refreshToken:string){
    localStorage.setItem('user-id',userId);
    localStorage.setItem('access-token',accessToken);
    localStorage.setItem('refresh-token',refreshToken);
  }

  private remSession(){
    localStorage.removeItem('user-id');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }
}
