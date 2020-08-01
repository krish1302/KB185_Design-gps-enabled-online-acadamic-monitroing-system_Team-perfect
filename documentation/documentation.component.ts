import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

declare var $:any;

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {
  doclist:Observable<any>;
  constructor(private fStore:AngularFireStorage,
    private fdb:AngularFireDatabase) {
     this.doclist= this.fdb.list('doc').valueChanges();
  }
  ngOnInit(): void {
     $('[data-toggle="tooltip"]').tooltip();
  }
  download(url) {
  window.open(url);
  }
}
