import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school-trace',
  templateUrl: './school-trace.component.html',
  styleUrls: ['./school-trace.component.css']
})
export class SchoolTraceComponent implements OnInit {
  lat:any=19.6641;
  lng:any=78.5320;
  constructor(private aroute:ActivatedRoute) {
    this.lat=this.aroute.snapshot.paramMap.get('lat').toString();
    this.lng=this.aroute.snapshot.paramMap.get('lng').toString();
   }

  ngOnInit(): void {
  }
  chooseLocation(e){
    this.lat=e.coords.lat;
    this.lng=e.coords.lng;
  }

}
