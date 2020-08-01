import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-school-gps',
  templateUrl: './school-gps.component.html',
  styleUrls: ['./school-gps.component.css']
})
export class SchoolGpsComponent implements OnInit {

  lat=19.6641;
  lng=78.5320;
 
  constructor(private aroute:ActivatedRoute,private fdb:AngularFireDatabase) { 
    var district=this.aroute.snapshot.paramMap.get('district');
    var area=this.aroute.snapshot.paramMap.get('area');
    var school=this.aroute.snapshot.paramMap.get('school');
    var self=this;
    this.fdb.database.ref('Andrapradesh/'+district+'/'+area+'/'+school+'/info').on('value',function(data){
      if(data.exists()){
        self.lat=data.child('lat').val();
        self.lng=data.child('lng').val();
      }
      else{
        window.alert('location not mentioned please contact adminstration');
      }
     
    });
 }

  ngOnInit(): void {

  }

  chooseLocation(e){
    this.lat=e.coords.lat;
    this.lng=e.coords.lng;
  }

}
