import { Injectable } from '@angular/core';
import { HttpRequestsService } from './http-requests.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IpserviceService {

  constructor(private http:HttpClient,private webService:HttpRequestsService,private router:Router) { }
  
  getBlockedIpAddressList(){
     return this.webService.getBlockedIpAddress();
  }

  // allowIp(sourceIp:string){
  //   return this.webService.allowIp(sourceIp);
  // }
  
  // blockIp(sourceIp:string){
  //   return this.webService.blockIp(sourceIp);
  // }

  allowblockIp(sourceIp:string,block:boolean){
    return this.webService.allowblockIp(sourceIp,block);
  }

}
