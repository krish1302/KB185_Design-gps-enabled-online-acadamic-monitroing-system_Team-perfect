import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient) { }
  
  public url='';

  enroll(user :User){
    return this.http.post<any>(this.url,user);
  }
}
