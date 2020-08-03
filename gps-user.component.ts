import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gps-user',
  templateUrl: './gps-user.component.html',
  styleUrls: ['./gps-user.component.css']
})
export class GpsUserComponent implements OnInit {
   loginList:Observable<any>;
   logoutList:Observable<any>;

  constructor(private fdb:AngularFireDatabase,private router:Router) 
  {
    this.loginList=this.fdb.list('monitor').valueChanges();
    this.logoutList=this.fdb.list('out').valueChanges();
   }

  ngOnInit(): void {
  }
  location(lat,lng){
    this.router.navigate(['/usermap/'+lat+'/'+lng+'/show']);
  }
  

}
