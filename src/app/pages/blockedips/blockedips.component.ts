import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Time, DatePipe } from '@angular/common';
import { IpserviceService } from 'src/app/ipservice.service';
import {ThemePalette} from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { HttpResponse } from '@angular/common/http';
import { SocketService } from 'src/app/socket.service';
import {FormControl, FormGroup} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf'
import { NgxSpinnerService } from 'ngx-spinner';


export interface IpAddressModel {
  blockIp: string;
  intrusionClass: string;
  blockedStatus: string;
  timestamp: Date;
}
let ELEMENT_DATA: IpAddressModel[] = [];
@Component({
  selector: 'app-blockedips',
  templateUrl: './blockedips.component.html',
  styleUrls: ['./blockedips.component.css']
})
export class BlockedipsComponent implements OnInit {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  sourceIp:string = "";
  action;
  @ViewChild('iptable', {static: false}) iptable: ElementRef;
  pipe: DatePipe;
  displayedColumns: string[] = ['Blocked IP Address', 'Intrusion Class', 'Status', 'Timestamp','ChangeStatus'];
  //dataSource : IpAddressModel[];
  dataSource =new MatTableDataSource(ELEMENT_DATA);

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });
  
  constructor(private ipservice:IpserviceService,private srv :SocketService, private spinner: NgxSpinnerService) { 
    
    this.pipe = new DatePipe('en');
    var convertedDate:Date;
    this.dataSource.filterPredicate = (data, filter) =>{
      if (this.fromDate && this.toDate) {
        convertedDate = new Date(data.timestamp);
        convertedDate.setHours(convertedDate.getHours() - 5,convertedDate.getMinutes() - 30);
        console.log(convertedDate);
        return convertedDate  >= this.fromDate && convertedDate <= this.toDate;
      }
      return true;
    }
  }


  ngOnInit(): void {

    this.spinner.show();

    this.ipservice.getBlockedIpAddressList().subscribe((packetDetails:any[])=>{
      this.spinner.hide();
      this.dataSource.data = packetDetails;
    })
  }

  public toggle(event: MatSlideToggleChange,element: IpAddressModel) {
    if (event.checked){
      this.ipservice.allowblockIp(element.blockIp,false).subscribe((res:HttpResponse<any>)=>{
        element.blockedStatus = 'UnBlocked';
      })
    }
    else{
      this.ipservice.allowblockIp(element.blockIp,true).subscribe((res:HttpResponse<any>)=>{
        element.blockedStatus = 'Blocked';
      })
      //this.srv.emitIpDetails(element.blockIp,true);
    }
  }

  
  checkAllowed(element: IpAddressModel) {
    if (element.blockedStatus == 'UnBlocked'){
      return true;
    }
    else{
      return false;
    }
  }

  get fromDate() { 
    return this.filterForm.get('fromDate').value; 
  }
  get toDate() { 
    return this.filterForm.get('toDate').value; 
  }

  filter() {
    this.dataSource.filter = '' + Math.random();
  }

  public downloadPdf() {
    const elemHandler = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    const pddoc = new jsPDF();
    const iptable = this.iptable.nativeElement;
    pddoc.fromHTML(iptable.innerHTML, 20, 20, {
      width: 200,
      'elementHandlers': elemHandler
    });
    pddoc.save('BlockedIPs.pdf');
  }
}
