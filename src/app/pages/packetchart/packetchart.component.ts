import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { multi } from './data';
import { DatePipe } from '@angular/common';
import { DateAgoPipe } from 'src/app/pipes/date-ago.pipe';
import * as shape from 'd3-shape';
import { MatTableDataSource } from '@angular/material/table';
import { IpserviceService } from 'src/app/ipservice.service';

export interface IpAddressModel {
  blockIp: string;
  intrusionClass: string;
  blockedStatus: string;
  timestamp: Date;
}

let ELEMENT_DATA: IpAddressModel[] = [];

@Component({
  selector: 'app-packetchart',
  templateUrl: './packetchart.component.html',
  styleUrls: ['./packetchart.component.css']
})

export class PacketchartComponent implements OnInit {

  multi: any[];
  NoOfIntrusions = 0;
  NoOfSecurePackets = 0;

  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  timeline: boolean = false;
  autoScale: boolean = false;
  gradient: boolean = true;
  yScaleMax: number = 100
  yScaleMin: number = 0
  avgRefLine = [{ value: 50.0, name: 'Average' }]
  showRefLines: boolean = true
  showRefLabels: boolean = true
  curveType: string = shape.curveCardinal.tension(0);
  public yAxisTickFormatingFn;

  //Attack Type Pie Chart 
  pChartGradient: boolean = false;
  pChartShowLegend: boolean = true;
  pShowLabels: boolean = false;
  isDoughnut: boolean = false;
  plegendPosition: string = 'right';

  //30 min bar chart
   // options
   bShowXAxis = true;
   bShowYAxis = true;
   bGradient = false;
   bShowLegend = true;
   bShowXAxisLabel = true;
   bXAxisLabel = 'IP Address';
   bAhowYAxisLabel = true;
   bYAxisLabel = 'Total Number of Intrusions';


   displayedColumns: string[] = ['Blocked IP Address', 'Intrusion Class', 'Status', 'Timestamp'];
   //dataSource : IpAddressModel[];
   dataSource =new MatTableDataSource(ELEMENT_DATA);

  colorScheme = {
    domain: ['#176BA0', '#19AADE', '#1AC9E6', '#1DE480']
  };


  pcolorScheme = {
    domain: ['#FF7575', '#3BB9BF', '#2779DC', '#EA71ED']
  };

  single = [
    {
      "name": "DDos",
      "value": 65
    },
    {
      "name": "Prob",
      "value": 20
    },
    {
      "name": "R2L",
      "value": 10.5
    },
      {
      "name": "U2R",
      "value": 4.5
    }
  ];

  ipTable = [
    {
      "name": "192.168.1.10",
      "value": 56
    },
    {
      "name": "192.168.1.20",
      "value": 31
    },
    {
      "name": "192.168.1.23",
      "value": 106
    },
      {
      "name": "192.168.1.102",
      "value": 63
    },
    {
      "name": "192.168.1.30",
      "value": 14
    },
    {
      "name": "192.168.1.12",
      "value": 96
    },
    {
      "name": "192.168.1.11",
      "value": 72
    },
      {
      "name": "192.168.1.15",
      "value": 42
    }
  ];

  pipe      = new DatePipe('en-US')
  startDate = new Date()
  lastIntrustionTime   = null
  lastSecurePacketTime = null
  dateAgo   = new DateAgoPipe()

  startAgo;
  secureAgo;
  intrusionAgo;


  constructor(private srv: SocketService, private ipservice:IpserviceService) {
    this.yAxisTickFormatingFn = this.yAxisTickFormating.bind(this)
    Object.assign(this, { multi });
  }

  ngOnInit() {
 
    this.ipservice.getBlockedIpAddressList().subscribe((packetDetails:any[])=>{
      this.dataSource.data = packetDetails.slice(0, 6);
    })

    // setInterval(() => {
    //   let CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds()

    //   let newdata = {
    //     "name": CurrentTime.toString(),
    //     "value": Math.floor(Math.random() * 2) + 1
    //   } 

      
    //   this.multi[0]["series"].push(newdata)
    //   if (this.multi[0]["series"].length > 10) this.multi[0]["series"].splice(0, this.multi[0]["series"].length - 10);
    //   this.multi = [...this.multi]

    // }, 1000);
    

    this.srv.listen('dataUpdate').subscribe((res: any) => {

      console.log(res)
      this.topPanelUpdate(res[0])
      this.graphUpdate(res[0])

    })

    this.lastTimeUpdate()
  }

  lastTimeUpdate() {

    console.log(this.startDate)
    setInterval(() => {
      
      this.startAgo = this.dateAgo.transform(this.startDate)
      //console.log(this.startAgo)

      if (this.lastSecurePacketTime != null){

        this.secureAgo = this.dateAgo.transform(this.lastSecurePacketTime)
        //console.log(this.secureAgo + " secureAgo")

      }

      if (this.lastIntrustionTime != null){

        this.intrusionAgo = this.dateAgo.transform(this.lastIntrustionTime)
        //console.log(this.intrusionAgo + " intrusionAgo")

      }

    }, 1000);
  }

  topPanelUpdate(data) {

    if (data.y > 50) {
      this.NoOfIntrusions++;
      this.lastIntrustionTime = new Date()
    }
    else {
      this.NoOfSecurePackets++;
      this.lastSecurePacketTime = new Date()

    }
  }
  
  graphUpdate(data){

    let packetTime  = new Date(data.x)
    let currentTime = this.pipe.transform(packetTime, 'mediumTime')

    
    let newdata = {
      "name": currentTime.toString(),
      "value": data.y
    } 

    
    this.multi[0]["series"].push(newdata)
    if (this.multi[0]["series"].length > 10) this.multi[0]["series"].splice(0, this.multi[0]["series"].length - 10);
    this.multi = [...this.multi]

  }

  yAxisTickFormating(val){
    
    return val
  }
}
