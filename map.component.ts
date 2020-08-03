import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { MapSchoolService } from '../map-school.service';
import { FormBuilder } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  districts:Observable<any>;
  subdistricts:Observable<any>;
  schoollists:Observable<any>;
  district:any;
  subdis:any;
  school:any;

   constructor(private fdb:AngularFireDatabase,private router:Router,private ms:MapSchoolService,private fb:FormBuilder) { 
    this.districts=this.fdb.list('Andrapradesh').snapshotChanges();
   
  }
 
  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
  }

  locate(place){
    this.district=place;
    this.subdistricts=this.fdb.list('Andrapradesh/'+place).snapshotChanges(); 
  }
  addDistrict(place){
     this.fdb.list('Andrapradesh/'+place).set('demo',12345);
  }


  dosomething(e){
    this.subdis=e.target.value;
    this.schoollists=this.fdb.list('Andrapradesh/'+this.district+'/'+this.subdis).snapshotChanges();
  }
  
  gotomap(school){
    this.router.navigate(['/schoolmap/'+this.district+'/'+this.subdis+'/'+this.school+'/info']);
   
  }

  gotopage(school){
    this.ms.setdistrict(this.district);
    this.ms.setarea(this.subdis);
    this.ms.setschool(school);
    this.router.navigate(['/schoolmap/'+this.district+'/'+this.subdis+'/'+school]);
  }
  locates(e){
    this.district=e.target.value;
    this.subdistricts=this.fdb.list('Andrapradesh/'+this.district).snapshotChanges(); 
  } 
}
