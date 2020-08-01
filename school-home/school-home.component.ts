import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-school-home',
  templateUrl: './school-home.component.html',
  styleUrls: ['./school-home.component.css']
})
export class SchoolHomeComponent implements OnInit {
  districtsList:Observable<any>;
  district:any;
  subdistrictList:Observable<any>;
  subarea:any;
  schoolList:Observable<any>;
  school:any;  
  dashboard:Observable<any>;
  key1:any;
  key2: any;
  key3: any;
  key4: any;
  key5: any;
  key6: any;
  key7: any;
  key11: any;
  key12: any;
  key13: any;
  key14: any;
  key15: any;
  key16: any;
  key17: any;
  key21: any;
  key22: any;
  key23: any;
  key24: any;
  key25: any;
  key26: any;
  key27: any;
  key8: any;
  key9: any;
  key10: any;
  key18: any;
  key19: any;
  key20: any;
  key28: any;
  key29: any;
  key30: any;
  hp:MatSnackBarHorizontalPosition="end";
  vp:MatSnackBarVerticalPosition="top";
  constructor(private fb:FormBuilder,
    private fdb:AngularFireDatabase,
    private snackbar:MatSnackBar) 
  {  
    this.districtsList=this.fdb.list('Andrapradesh').snapshotChanges();
  }
  setdistricts(e){
     this.district=e.target.value;
     this.subdistrictList=this.fdb.list('Andrapradesh/'+this.district).snapshotChanges();
  }
  setarea(e){
     this.subarea=e.target.value;
     this.schoolList= this.fdb.list('Andrapradesh/'+this.district+'/'+this.subarea).snapshotChanges();
  }
  setschool(e){
    this.school=e.target.value;
  }
  search(){
    var self=this;
    this.fdb.database.ref('Andrapradesh/'+this.district+'/'+this.subarea+'/'+this.school+'/dashboard').on('value',function(data){
        self.key1=data.child('key1').val();
        self.key2=data.child('key2').val();
        self.key3=data.child('key3').val();
        self.key4=data.child('key4').val();
        self.key5=data.child('key5').val();
        self.key6=data.child('key6').val();
        self.key7=data.child('key7').val();
        self.key8=data.child('key8').val();
        self.key9=data.child('key9').val();
        self.key10=data.child('key10').val();
        self.key11=data.child('key11').val();
        self.key12=data.child('key12').val();
        self.key13=data.child('key13').val();
        self.key14=data.child('key14').val();
        self.key15=data.child('key15').val();
        self.key16=data.child('key16').val();
        self.key17=data.child('key17').val();
        self.key18=data.child('key18').val();
        self.key19=data.child('key19').val();
        self.key20=data.child('key20').val();
        self.key21=data.child('key21').val();
        self.key22=data.child('key22').val();
        self.key23=data.child('key23').val();
        self.key24=data.child('key24').val();
        self.key25=data.child('key25').val();
        self.key26=data.child('key26').val();
        self.key27=data.child('key27').val();
        self.key28=data.child('key28').val();
        self.key29=data.child('key29').val();
        self.key30=data.child('key30').val();
    });
  }
  dashForm=this.fb.group({
    1:[''],
    2:[''],
    3:[''],
    4:[''],
    5:[''],
    6:[''],
    7:[''],
    8:[''],
    9:[''],
    10:[''],
    11:[''],
    12:[''],
    13:[''],
    14:[''],
    15:[''],
    16:[''],
    17:[''],
    18:[''],
    19:[''],
    20:[''],
    21:[''],
    22:[''],
    23:[''],
    24:[''],
    25:[''],
    26:[''],
    27:[''],
    28:[''],
    29:[''],
    30:['']
  })
  
 

  ngOnInit(): void {
  }
  
  submit(){
    var self=this;
    var user=this.fdb.list('Andrapradesh/'+this.district+'/'+this.subarea+'/'+this.school+'/dashboard');
    user.set('key1',this.dashForm.get('1').value);
    user.set('key2',this.dashForm.get('2').value);
    user.set('key3',this.dashForm.get('3').value);
    user.set('key4',this.dashForm.get('4').value);
    user.set('key5',this.dashForm.get('5').value);
    user.set('key6',this.dashForm.get('6').value);
    user.set('key7',this.dashForm.get('7').value);
    user.set('key8',this.dashForm.get('8').value);
    user.set('key9',this.dashForm.get('9').value);
    user.set('key10',this.dashForm.get('10').value);
    user.set('key11',this.dashForm.get('11').value);
    user.set('key12',this.dashForm.get('12').value);
    user.set('key13',this.dashForm.get('13').value);
    user.set('key14',this.dashForm.get('14').value);
    user.set('key15',this.dashForm.get('15').value);
    user.set('key16',this.dashForm.get('16').value);
    user.set('key17',this.dashForm.get('17').value);
    user.set('key18',this.dashForm.get('18').value);
    user.set('key19',this.dashForm.get('19').value);
    user.set('key20',this.dashForm.get('20').value);
    user.set('key21',this.dashForm.get('21').value);
    user.set('key22',this.dashForm.get('22').value);
    user.set('key23',this.dashForm.get('23').value);
    user.set('key24',this.dashForm.get('24').value);
    user.set('key25',this.dashForm.get('25').value);
    user.set('key26',this.dashForm.get('26').value);
    user.set('key27',this.dashForm.get('27').value);
    user.set('key28',this.dashForm.get('28').value);
    user.set('key29',this.dashForm.get('29').value);
    user.set('key30',this.dashForm.get('30').value).then(function(){
      self.snackbar.open('value added!!!','ok',{
        duration:2000,
        horizontalPosition:self.hp,
        verticalPosition:self.vp
      });
    }).catch(function(error){
      self.snackbar.open('Error:'+error,'ok',{
        duration:2000,
        horizontalPosition:self.hp,
        verticalPosition:self.vp
      });
    });    
  

  }

}