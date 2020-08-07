import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { strict } from 'assert';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  readonly ROOT_URL;
  
  constructor(private http:HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000';
  }
  
  login(email:string,password:string){
    return this.http.post(this.ROOT_URL+'/users/login',{
      email,
      password
    },
    {observe: "response" }
    );
  }

  register(email:string,password:string){
    console.log('before network call')
    return this.http.post(this.ROOT_URL+'/users',{
      email,
      password
    },
    {observe:'response'});
  }

  getBlockedIpAddress(){
    const token =  localStorage.getItem('access-token');
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token':  token
      })
    };
    httpOptions.headers =
    httpOptions.headers.set('x-access-token', token);
    return this.http.get(this.ROOT_URL+'/getBlockedIpList',
    httpOptions
    );
  }

  // allowIp(sourceIp:string){
  //   return this.http.post('http://localhost:3000/blockedIps/allowIp',{
  //     sourceIp
  //   });
  // }
  // blockIp(sourceIp:string){
  //   return this.http.post('http://localhost:3000/blockedIps/blockIp',{
  //     sourceIp
  //   });
  // }
  allowblockIp(sourceIp:string,block: boolean){
    return this.http.post(this.ROOT_URL+'/blockedIps/allowblockIp',{
      SourceIp : sourceIp,
      Block    : block
    });
  }

  
  
  
}
