import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  galaPhotoList:Observable<any>;
  galaVideoList:Observable<any>;

   constructor(private fdb:AngularFireDatabase) {
      this.galaPhotoList=this.fdb.list('galarey/photo').valueChanges();
      this.galaVideoList=this.fdb.list('galarey/video').valueChanges();    
    }

  ngOnInit(): void
  {
    
  }
  
 

}
