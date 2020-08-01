import { Component, NgZone } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bala';
  showbutton=true;
  sideshow=true;
  school:any;
  load=true;
  loginuser:any;
  district:any;
   districts:Observable<any>;
  subdistricts:Observable<any>;
  schoollists:Observable<any>;
  constructor( private fb:FormBuilder,
    private fauth:AngularFireAuth,
    private fdb:AngularFireDatabase,
    private router:Router,
    private aroute:ActivatedRoute,
    private zone:NgZone,
    private fStore:AngularFireStorage,
    private snackbar:MatSnackBar){
      var self=this;
     this.fdb.database.ref('Android app').on('value',function(datasnapshot){
      self.applink=datasnapshot.val();
     })
      this.districts=this.fdb.list('Andrapradesh').snapshotChanges();
     }
     hp:MatSnackBarHorizontalPosition='end';
     vp:MatSnackBarVerticalPosition='top';
     locate(e){
      this.district=e.target.value;
      this.subdistricts=this.fdb.list('Andrapradesh/'+this.district).snapshotChanges(); 
    }
    dosomething(e){
     var subdis=e.target.value;
      this.schoollists=this.fdb.list('Andrapradesh/'+this.district+'/'+subdis).snapshotChanges();
    }
    navi(){
      this.router.navigate(['/view/'+this.routerForm.get('dis').value+'/'+this.routerForm.get('area').value+'/'+this.routerForm.get('school').value]);
    }
    gotomap(){
      this.router.navigate(['/schoolmap/'+this.routerForm.get('dis').value+'/'+this.routerForm.get('area').value+'/'+this.routerForm.get('school').value+'/info']);
    }
   routerForm=this.fb.group({
     dis:[''],
     area:[''],
     school:['']
   });  

  logout(){
    this.fauth.signOut();
    this.router.navigate(['/home']);
    this.showbutton=true;
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  /*login component start */
  hide=true;
  userid:any;
  userdetails:Observable<any>;
  loginForm=this.fb.group({
   user:[''],
   email:[''],
   password:['']
  });

  get userValidation(){
    return this.loginForm.get('user').touched && this.loginForm.get('user').invalid && this.loginForm.get('user').pristine;
  }
  get emailValidation(){
    return this.loginForm.get('email').touched && this.loginForm.get('email').invalid;
  }
  get passwordValidation(){
    return this.loginForm.get('password').touched && this.loginForm.get('password').invalid;
  }

  async signIn(user:string,email:string,password:string){
      
       this.loginuser=email;
       var self=this;
       this.fauth.setPersistence('none').then(()=>{
          this.fauth.signInWithEmailAndPassword(email, password)
              .then((result) => {
                if (result.user.emailVerified !== true) {
                  this.SendVerificationMail()
                  self.snackbar.open('Please validate your email address. Kindly check your inbox.','ok',{
                    duration:2000,
                    horizontalPosition: self.hp,
                    verticalPosition: self.vp,
                  });
                }
                else{
                  var self=this;
                  this.fdb.database.ref('user/'+user+'/'+(result.user.uid)).once('value',function(datasnapshot){
                    if(email===datasnapshot.child('email').val()){
                    self.gotohome();
                    }
                    else{
                      self.snackbar.open('Please check your user type or other details...','ok',{
                        duration:2000,
                        horizontalPosition: self.hp,
                        verticalPosition: self.vp,
                      });
                    }
                  })
                }
           }).catch(function(error){
           self.snackbar.open('Error:'+error,'ok',{
             duration:2000,
             horizontalPosition: self.hp,
             verticalPosition: self.vp,
           });
           }); 
        })
   
      
  }

  async SendVerificationMail() {
    (await this.fauth.currentUser).sendEmailVerification()
  }

  public gotohome(){
    this.zone.run(()=>this.router.navigate(['/home']));
    this.showbutton=false;
  }

   /*login component end */

   /*Home component start*/

   downloadURL: Promise<any>;
   uploadPercent: Observable<number>;
   filename:any;
   tab=null;
   hides=true;

  submitForm=this.fb.group({
    title:['',Validators.required],
    date:['',Validators.required],
    post:[''],
    photo:['',Validators.required]
   
  })
  

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
        this.snackbar.open('file uploaded now click submit !!!','ok',{
          duration:2000,
          horizontalPosition: this.hp,
          verticalPosition: this.vp,
        });
      }))
  )
  .subscribe()   
  }

  async submit(title,date,downloadURL){
    var ref=this.fdb.list('home/'+this.tab+'/'+title);
    ref.set('title',title);
    ref.set('date',date);
    ref.set('downurl',downloadURL).then(function(){
        this.snackbar.open('value added...','ok',{
          duration:2000,
          horizontalPosition: this.hp,
          verticalPosition: this.vp,
        });
      }).catch(function(error){
        this.snackbar.open('Error:'+error,'ok',{
          duration:2000,
          horizontalPosition: this.hp,
          verticalPosition: this.vp,
        });
      });
   }
  submit1(title,date,downloadURL,post){
    var ref=this.fdb.list('home/'+this.tab+'/'+title);
    ref.set('title',title);
    ref.set('date',date);
    ref.set('post',post);
    ref.set('downurl',downloadURL).then(function(){
      this.snackbar.open('value added...','ok',{
        duration:2000,
        horizontalPosition: this.hp,
        verticalPosition: this.vp,
      });
    }).catch(function(error){
      this.snackbar.open('Error:'+error,'ok',{
        duration:2000,
        horizontalPosition: this.hp,
        verticalPosition: this.vp,
      });
    }); 
   }

   emptyform(){
    this.submitForm.patchValue({
      title:'',
      date:'',
      photo:''
    });
  }

  changetab(tabs:string){
    this.emptyform();
    this.tab=tabs;
    if(tabs=='photo'){
      this.hides=false;
    }
    else{
      this.hides=true;
    }

  }

  applink:any;
  downloadapp(){
   ///window.location.href=this.applink;
   window.open(this.applink);
  }
  /* home component end*/

  /* document component start*/
 submitdoc(title,date,downloadURL){
    var ref=this.fdb.list('doc/'+title);
    ref.set('title',title);
    ref.set('date',date);
    ref.set('downurl',downloadURL).then(function(){
      this.snackbar.open('value added...','ok',{
        duration:2000,
        horizontalPosition: this.hp,
        verticalPosition: this.vp,
      });
    }).catch(function(error){
      this.snackbar.open('Error:'+error,'ok',{
        duration:2000,
        horizontalPosition: this.hp,
        verticalPosition: this.vp,
      });
    }); 
    this.emptyform();
   }
   
   submitscheme(title,date,downloadURL){
    var ref=this.fdb.list('scheme/'+title);
    ref.set('title',title);
    ref.set('date',date);
    ref.set('downurl',downloadURL).then(function(){
      this.snackbar.open('value added...','ok',{
        duration:2000,
        horizontalPosition: this.hp,
        verticalPosition: this.vp,
      });
    }).catch(function(error){
      this.snackbar.open('Error:'+error,'ok',{
        duration:2000,
        horizontalPosition: this.hp,
        verticalPosition: this.vp,
      });
    }); 
    this.emptyform();
   }


  /* document component end*/



   myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  ///////////////////////////////////////////////////
  video:any;
  uploadvideo(head){
      var user=this.fdb.list('galarey/video/'+head);
      user.set('head',head);
      user.set('downurl',this.downloadURL).then(function(){
        this.snackbar.open('video uploaded ','ok',{
          duration:2000,
          horizontalPosition:this.hp,
          verticalPosition:this.vp
        });
      })
  }
  uploadphoto(head){
    var user=this.fdb.list('galarey/photo/'+head);
    user.set('head',head);
    user.set('downurl',this.downloadURL).then(function(){
      this.snackbar.open('video uploaded ','ok',{
        duration:2000,
        horizontalPosition:this.hp,
        verticalPosition:this.vp
      });
    })
  }

}


