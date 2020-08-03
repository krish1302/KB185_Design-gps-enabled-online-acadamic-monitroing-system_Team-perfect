import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  doclist:Observable<any[]>;
  constructor(private fStore:AngularFireStorage,
    private fdb:AngularFireDatabase) {
      this.doclist= this.fdb.list('scheme').valueChanges();
    }
  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
  }

  download(url) {
    window.open(url);
    //  window.location.href=url;
    }
}
