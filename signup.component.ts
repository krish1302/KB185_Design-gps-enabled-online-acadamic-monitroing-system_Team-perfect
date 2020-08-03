import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  constructor(
    public fauth:AngularFireAuth,
    public  router:  Router,
    private fb:FormBuilder,
    private fdb:AngularFireDatabase,
    private _snackBar: MatSnackBar)
    { 
      
      
    }
    h_Position:MatSnackBarHorizontalPosition='end';
    v_Position: MatSnackBarVerticalPosition = 'top';
    hide1=true;
    userid:any;
    userdetails:AngularFireList<any>;
    signupForm=this.fb.group({
    user:['',Validators.required] ,
    email:['',Validators.required],
    passCode:['',Validators.required],
    password:['',Validators.required], 
    confirmpassword:['',Validators.required]
    });
  
  ngOnInit(): void {
   
  } 
  register(email, password,user,passCode) {
    var self=this;
  this.fdb.database.ref('user').on('value',function(datasnap){
    var code=datasnap.child('Admincode').val();
   
    if(code==passCode){

      self.fauth.createUserWithEmailAndPassword(email,password).then((cred)=>{
        self.userid=cred.user.uid;
        self.sendEmail();
        var ref=self.fdb.database.ref('user/'+user+'/'+self.userid);
        ref.child('email').set(email);
        ref.child('password').set(password);
        ref.child('uid').set(self.userid);
        ref.child('permission').set(true);        
      });
    }else{
      self._snackBar.open('Please check your passCode!','bye', {
        duration: 1000,
        horizontalPosition: self.h_Position,
        verticalPosition: self.v_Position,
      });
    }


  }); 

    /* await this.fdb.database.ref('user/Admincode').on('value',async datasnapshot=>{
       var code=datasnapshot.val();
       if(code===passCode){
         await this.fauth.createUserWithEmailAndPassword(email,password).then( Cred=>{
              this.userid=Cred.user.uid;
              this.sendEmail(email,password,user);
            });
            var ref=this.fdb.database.ref('user/'+user+'/'+this.userid);
            ref.child('email').set(email);
            ref.child('password').set(password);
            ref.child('uid').set(this.userid);
            ref.child('permission').set(true);
            
        }
       else{
        this._snackBar.open('Please check your passCode!','bye', {
          duration: 1000,
          horizontalPosition: this.h_Position,
          verticalPosition: this.v_Position,
        });
       }
    }); */
  }
  
  get user(){
    return this.signupForm.get('user');
  }
  get uservalid(){
     return this.signupForm.get('user').touched && this.signupForm.get('user').invalid;
  }

    async sendEmail(){
      (await this.fauth.currentUser).sendEmailVerification();
     
      this._snackBar.open('check the email verification in your email inbox & login to continue application!!! ','Thank you!', {
        duration: 5000,
        horizontalPosition: this.h_Position,
        verticalPosition: this.v_Position,
      });

      this.emptyform();
      
    }
  emptyform() {
    this.signupForm.patchValue({
      user:'' ,
      passCode:'',
      email:'',
      password:'', 
      confirmpassword:''
    });
  }
}
