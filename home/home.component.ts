import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { finalize } from 'rxjs/operators';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  public isMenuCollapsed = true;

  uploadPercent: Observable<number>;
  downloadURL: Promise<any>;
  filename:any;
  newslist:Observable<any[]>;
  eventlist:Observable<any[]>;
  achievelist:Observable<any[]>;
  photolist:Observable<any[]>;
  tab=null;
  hide=true;
  userstate=false;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  constructor(private fStore:AngularFireStorage,
    private fb:FormBuilder,
    private fdb:AngularFireDatabase) {
     this.newslist=this.fdb.list('home/news').valueChanges();
     this.eventlist=this.fdb.list('home/event').valueChanges();
     this.achievelist=this.fdb.list('home/achieve').valueChanges();
     this.photolist=this.fdb.list('home/photo').valueChanges();

  }

 

  ngOnInit(): void {
    $('.carousel').carousel()
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  
  uploadFile(e){

    const file = e.target.files[0];
    const filePath = 'image/'+file.name;
    const fileRef = this.fStore.storage.ref(filePath);
    const task=this.fStore.upload(filePath,file);

    this.filename=file.name;
    // observe percentage changes
    this.uploadPercent=task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() =>  fileRef.getDownloadURL().then(url=>{
        this.downloadURL=url;
      }))
  )
  .subscribe()   
  }

  download(url) {
  window.open(url);
  // window.location.href=url;
  }

 
   
 
  

}
