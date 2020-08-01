import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder ,FormArray, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import   html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';

declare var $:any;


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
   @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  
  district:any;
  tabshow=true;
  school:any;
  area:any;
  hide=true;
  isCollapse=true;

  openNav=true;
  tabcontrol=false;

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
 hp:MatSnackBarHorizontalPosition="end";
 vp:MatSnackBarVerticalPosition="top";

  constructor(private router:Router,private aroute:ActivatedRoute,private fdb:AngularFireDatabase,
    private fStore:AngularFireStorage,private fb:FormBuilder,private fauth:AngularFireAuth,
    private snackbar:MatSnackBar) { 
    this.district=this.aroute.snapshot.paramMap.get('district');
    this.area=this.aroute.snapshot.paramMap.get('area');
    this.school=this.aroute.snapshot.paramMap.get('school');
    this.newslist=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'home/news').valueChanges();
    this.eventlist=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'home/event').valueChanges();
    this.achievelist=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'home/achieve').valueChanges();
    this.photolist=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'home/photo').valueChanges();
    this.images=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/home/photo').valueChanges();
    this.teacherprofiles=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/teacherprofile').valueChanges();
    this.yearlist=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/admission').snapshotChanges();
    this.sportsList=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/sports/event').valueChanges();
    this.sportsPhotoList=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/sports/images').valueChanges();
    this.galareyPhotoList=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/Galarey/photo').valueChanges();
    this.galareyVideoList=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/Galarey/video').valueChanges();
  }

  public isMenuCollapsed = true;
  ngOnInit() {
    $('#myTab a').on('click', function (e) {
      e.preventDefault()
      $(this).tab('show')
    });
    
    $('.collapse').collapse('toggle');
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

  showteacheratList:Observable<any>;
  showteachAttendance(){
    this.showteacheratList=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/teacherattendance/'+this.date).valueChanges();
  }


 
  ////home component
  images:Observable<any>;
  downloadURL: any;
  filename:any;
  uploadPercent: Observable<number>;
  newslist:Observable<any[]>;
  eventlist:Observable<any[]>;
  achievelist:Observable<any[]>;
  photolist:Observable<any[]>;
  tab:any;
  hides:any;
  async submit(title,date,downloadURL){
    var ref=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'home/'+this.tab+'/'+title);
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
    var ref=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'home/'+this.tab+'/'+title);
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
  submitForm=this.fb.group({
    title:['',Validators.required],
    date:['',Validators.required],
    post:[''],
    photo:['',Validators.required]
   
  })

   emptyform(){
    this.submitForm.patchValue({
      title:'',
      date:'',
      photo:''
    });
  }

   download(url){
    window.open(url);
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
  
  getdownloadurl(e){
    const file = e.target.files[0];
    const filePath =this.school+'/home/image/'+file.name;
    const fileRef = this.fStore.storage.ref(filePath);
    const task=this.fStore.upload(filePath,file);
    this.filename=file.name;
    task.snapshotChanges().pipe(
      finalize(() =>  fileRef.getDownloadURL().then(url=>{
        this.downloadURL=url;
        this.snackbar.open('file added now click submit','ok',{
          duration:2000,
          horizontalPosition:this.hp,
          verticalPosition:this.vp
        })
      }))
  )
  .subscribe()
  }


  //teacher start
  teacherprofiles:Observable<any>;
  teacherForm=this.fb.group({
    name:[''],
    role:[''],
    deg:['']
  });

  addProfile(name,role,deg){
    var user=this.fdb.database.ref('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/teacherprofile/'+name);
    user.child('name').set(name);
    user.child('role').set(role);
    user.child('deg').set(deg);
    user.child('url').set(this.downloadURL).then(function(){
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
   
    this.downloadURL=null;
  }

  //admission component start
  yearlist:Observable<any>;
  admissionList:Observable<any>;
   admissForm=this.fb.group({
    name:[''],
    dob:[''],
    reg:[''],
    fa_name:[''],
    fa_work:[''],
    ma_name:[''],
    ma_work:[''],
    add:[''],
    gender:[''],
    first:[''],
    comm:[''],
    caste:[''],
    email:[''],
    phone:[''],
    year:['']
  });
  
  addAdmission(name,dob,reg,fa_name,fa_work,ma_name,ma_work,add,gender,first,comm,caste,email,phone,year){
    var user=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/admission/'+year+'/'+reg);
    user.set('name',name);
    user.set('dob',dob);
    user.set('reg',reg);
    user.set('fa_name',fa_name);
    user.set('fa_work',fa_work);
    user.set('ma_name',ma_name);
    user.set('ma_work',ma_work);
    user.set('first',first);
    user.set('add',add);
    user.set('gender',gender);
    user.set('comm',comm);
    user.set('caste',caste);
    user.set('email',email);
    user.set('phone',phone);
    user.set('url',this.downloadURL).then(function(){
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
    this.downloadURL=null;
  
  }

  showAdmissionList(e){
      var year=e.target.value;
      this.admissionList=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/admission/'+year).valueChanges();
  }

  ///classess component start
  cs:any;
  classes:Observable<any>;
  classList:Observable<any>;
  sectionList:Observable<any>;
  studentList:Observable<any[]>;
  studentShowList:Observable<any[]>;
  year:any;
  stand:any;
  section:any;
  classForm=this.fb.group({
    select:[''],
    val:['']
  });
  addForm=this.fb.group({
    year:[''],
    reg:[''],
    regno:['']
  });
  csclass(){
    this.cs=true;
  }
  cssection(){
    this.cs=false;
    this.classes=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year+'/standard').snapshotChanges();
  }
  addsection(sel,val){
      var user=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year+'/standard/'+sel);
      this.fdb.database.ref('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year+'/standard/'+sel).once('value',function(datasnapshot){
        if(datasnapshot.hasChild(val)){
         this.snackbar.open('value exists','ok',{
           duration:2000,
           horizontalPosition:this.hp,
           verticalPosition:this.vp
         })
        }
        else{
          user.set(val,'');
        }
      })
    
  }
  addclass(val){
    var self=this;
    this.fdb.database.ref('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year+'/standard').once('value',function(datasnap){
      if(datasnap.hasChild(val)){
        this.snackbar.open('value exists','ok',{
          duration:2000,
          horizontalPosition:this.hp,
          verticalPosition:this.vp
        })
      }
      else{
       self.fdb.list('Andrapradesh/'+self.district+'/'+self.area+'/'+self.school+'/class/'+self.year+'/standard').set(val,'');
      }
    })
  }
 
  setyear(e){
    this.year=e.target.value;
    this.classList=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year+'/standard').snapshotChanges();
  }
  selectsection(stand){
    this.stand=stand;
    this.sectionList=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year+'/standard/'+stand).snapshotChanges();
  }
  addstudent(year,reg,regno){
    var self=this;
    this.fdb.database.ref('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/admission/'+year+'/'+reg).once('value',function(datasnapshot){
      if(datasnapshot.exists){
        var url=datasnapshot.child('url').val();
        var name=datasnapshot.child('name').val();
        var dob=datasnapshot.child('dob').val();
        var user=self.fdb.list('Andrapradesh/'+self.district+'/'+self.area+'/'+self.school+'/class/'+self.year+'/standard/'+self.stand+'/'+self.section+'/'+regno);
        user.set('ad_year',year);
        user.set('ad_no',reg);
        user.set('name',name);
        user.set('dob',dob);
        user.set('url',url);
        user.set('reg',regno).then(function(){
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
      else{
       this.snackbar.open('please check the detals....','ok',{
         duration:2000,
         vertivalPosition:this.vp,
         horizontalPosition:this.hp
       })
      }
    })
  }
  showStudentList(section){
    this.section=section;
    this.studentShowList=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year+'/standard/'+this.stand+'/'+section).valueChanges();
  }

  cscheck(){
    return (this.stand==null && this.section==null);
  }

  ///attendance component start
  year1:any;
  stand1:any;
  section1:any;
  classList1:Observable<any>;
  sectionList1:Observable<any>;
  studentShowList1:Observable<any>;
  studentShowList2:Observable<any>;
  date:any;
  check:any;
  attendance:any;

  Export() {
   var element =document.getElementById('showat');
   html2canvas(element).then((canvas)=>{
     console.log(canvas);
     var imgData=canvas.toDataURL('image/png');
    
      var doc=new jspdf();

      doc.addImage(imgData,0,0,208,500);
      doc.save(this.date+".pdf");

    
   })
  }
  
  setyear1(e){
    this.year1=e.target.value;
    this.classList1=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year1+'/standard').snapshotChanges();
  }
  selectsection1(stand){
    this.stand1=stand;
    this.sectionList1=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year1+'/standard/'+stand).snapshotChanges();
  }
  showStudentList1(section){
    this.section1=section;
    this.studentShowList1=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year1+'/standard/'+this.stand1+'/'+section).valueChanges();
  } 
  putAttendance(name,reg,che){
    var user=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/attendance/'+this.year1+'/standard/'+this.stand1+'/'+this.section1+'/'+this.date+'/'+reg);
    user.set('at',che.target.value);
    user.set('reg',reg);
    user.set('name',name).then(function(){
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
  showAttendance(){
    this.studentShowList2=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/attendance/'+this.year1+'/standard/'+this.stand1+'/'+this.section1+'/'+this.date).valueChanges();
  }

  //examination component start
  year2:any;
  classList2:Observable<any>;
  examList:Observable<any>;
  examShowList:Observable<any>;
  numbers=[];
  stand2:any;
  exam:any;
  add_exam:any;
  show_exam:any;

  examForm=this.fb.group({
     sno:this.fb.array([]),
     name:this.fb.array([]),
     date:this.fb.array([])
  });
 
  get sno(){
    return this.examForm.get('sno') as FormArray;
  }
  get name(){
    return this.examForm.get('name') as FormArray;
  }
  get dates(){
    return this.examForm.get('date') as FormArray;
  }

  setyear2(e){
    this.year2=e.target.value;
    this.classList2=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year2+'/standard').snapshotChanges();
 }
  addnumber(val){
     this.sno.push(this.fb.control(''));
     this.name.push(this.fb.control(''));
     this.dates.push(this.fb.control(''));
     this.numbers.push(val);
     console.log(this.numbers);
  }
  setstand2(val){
    this.stand2=val;
    this.examList= this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/examination/'+this.year2+'/standard/'+this.stand2).snapshotChanges();
  }
  submitexam(){
    var user=this.fdb.database.ref('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/examination/'+this.year2+'/standard/'+this.stand2+'/'+this.exam);
    for(var i=0;i<this.numbers.length;i++){
      var sno=this.sno.at(i).value;
      var name=this.name.at(i).value;
      var date=this.dates.at(i).value;
     
      user.child(sno).child('sno').set(sno);
      user.child(sno).child('sub').set(name);
      user.child(sno).child('date').set(date).then(function(){
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
 }
 
 showExamination(){
   this.examList= this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/examination/'+this.year2+'/standard/'+this.stand2).snapshotChanges();
 }
 showExaminationList(e){
  var exams=e.target.value;
  this.examShowList= this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/examination/'+this.year2+'/standard/'+this.stand2+'/'+exams).valueChanges();
  }


  ////Result component start
  year3:any;
  classList3:Observable<any>;
  stand3:any;
  section3:any;
  sectionList3:Observable<any>;
  ResultsStudentList:Observable<any>;
  ExamList:Observable<any>;
  ExamSubList:Observable<any>;
  showSubjectResult:Observable<any>;
  exam_name:any;
  subject_name:any;
  put_result:any;
  show_result:any;
  resultForm=this.fb.group({
    reg:this.fb.array([]),
    name:this.fb.array([]),
    mark:this.fb.array([])
  });
  get examreg(){
    return this.resultForm.get('reg') as FormArray;
  }
  get examname(){
    return this.resultForm.get('name') as FormArray;
  }
  get exammark(){
    return this.resultForm.get('mark') as FormArray;
  }
  setyear3(e){
    this.year3=e.target.value;
    this.classList3=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year3+'/standard').snapshotChanges();
  }
  selectsection3(stand){
    this.stand3=stand;
    this.sectionList3=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year3+'/standard/'+stand).snapshotChanges();
  }
  getstudentList(section){
    this.section3=section;
    this.ResultsStudentList=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year3+'/standard/'+this.stand3+'/'+this.section3).valueChanges();
    this.ExamList=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/examination/'+this.year3+'/standard/'+this.stand3).snapshotChanges();
  }
  getsubjectList(e){
    this.exam_name=e.target.value;
    this.ExamSubList=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/examination/'+this.year3+'/standard/'+this.stand3+'/'+this.exam_name).valueChanges();
  }
  setsubject(e){
    this.subject_name=e.target.value;
    this.showSubjectResult=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/result/'+this.year3+'/standard/'+this.stand3+'/'+this.section3+'/'+this.exam_name+'/'+this.subject_name).valueChanges();
  }
  showResult(){
    this.show_result=true;
    this.put_result=false;
    this.showSubjectResult=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/result/'+this.year3+'/standard/'+this.stand3+'/'+this.section3+'/'+this.exam_name+'/'+this.subject_name).valueChanges();
  }
  putResult(){
    this.show_result=false;
    this.put_result=true;
  }
  createpush(){
    this.examreg.push(this.fb.control(''));
    this.examname.push(this.fb.control(''));
    this.exammark.push(this.fb.control(''));
  }
  addmarkstodatabase(reg,name,e){
    var mark=e.target.value;
    var user=this.fdb.database.ref('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/result/'+this.year3+'/standard/'+this.stand3+'/'+this.section3+'/'+this.exam_name+'/'+this.subject_name);
    user.child(reg).child('reg').set(reg);
    user.child(reg).child('name').set(name);
    user.child(reg).child('mark').set(mark).then(function(){
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

  //sports component start
  sportsEvent:any;
  sportsList:Observable<any>;
  sportsPhotoList:Observable<any>;
  sportsForm=this.fb.group({
    head:[''],
    content:[''],
    date:['']
  });

  addSportsEvent(head,news,date){
    var user=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/sports/event/'+head);
    user.set('head',head);
    user.set('content',news);
    user.set('date',date).then(function(){
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
  addSportsPhoto(){
   var user=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/sports/images'); 
   user.push(this.downloadURL).then(function(){
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
   this.downloadURL=null; 
  }

  ////galarey component start
  gEvent:any;
  galareyPhotoList:Observable<any>;
  galareyVideoList:Observable<any>;
  addGalareyForm=this.fb.group({
    head:[''],
    content:[''],
    date:[''],
  })

  addGalareyVideo(head,content,date){
    var user=this.fdb.list("Andrapradesh/"+this.district+'/'+this.area+'/'+this.school+'/Galarey/video/'+head);
    user.set('head',head);
    user.set('content',content);
    user.set('date',date);
    user.set('url',this.downloadURL).then(function(){
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
    this.downloadURL=null;
  }
  addGalareyPhoto(head,content,date){
    var user=this.fdb.list("Andrapradesh/"+this.district+'/'+this.area+'/'+this.school+'/Galarey/photo/'+head);
    user.set('head',head);
    user.set('content',content);
    user.set('date',date);
    user.set('url',this.downloadURL).then(function(){
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
    this.downloadURL=null;
  }

  ///lecture component start  
  year4:any;
  stand4:any;
  lectureEvent:any;
  review:any;
  classList4:Observable<any>;
  lectureVideoList:Observable<any>;
  lectureDocumentList:Observable<any>;
  reviewList:Observable<any>;
  setyear4(e){
    this.year4=e.target.value;
    this.classList4=this.fdb.list('Andrapradesh/'+this.district+'/'+this.area+'/'+this.school+'/class/'+this.year4+'/standard').snapshotChanges();
  }
  setstand4(stand){
    this.stand4=stand;
    this.lectureVideoList=this.fdb.list("Andrapradesh/"+this.district+'/'+this.area+'/'+this.school+'/lecture/'+this.year4+'/standard/'+this.stand4+'/video').valueChanges();
    this.lectureDocumentList=this.fdb.list("Andrapradesh/"+this.district+'/'+this.area+'/'+this.school+'/lecture/'+this.year4+'/standard/'+this.stand4+'/document').valueChanges();
  }
  addLectureVideo(head,content,date){
    var user=this.fdb.list("Andrapradesh/"+this.district+'/'+this.area+'/'+this.school+'/lecture/'+this.year4+'/standard/'+this.stand4+'/video/'+head);
    user.set('head',head);
    user.set('content',content);
    user.set('date',date);
    user.set('url',this.downloadURL).then(function(){
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
    this.downloadURL=null;
  }
  addLectureDocument(head,content,date){
    var user=this.fdb.list("Andrapradesh/"+this.district+'/'+this.area+'/'+this.school+'/lecture/'+this.year4+'/standard/'+this.stand4+'/document/'+head);
    user.set('head',head);
    user.set('content',content);
    user.set('date',date);
    user.set('url',this.downloadURL).then(function(){
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
    this.downloadURL=null;
  }
  downloadDocument(url){
    window.open(url);
  }
  addReview(head,review,email){
    var user=this.fdb.database.ref("Andrapradesh/"+this.district+'/'+this.area+'/'+this.school+'/lecture/'+this.year4+'/standard/'+this.stand4+'/video/'+head+'/review');
    user.child(email).child('email').set(email);
    user.child(email).child('review').set(review).then(function(){
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
    this.review=null;
  }
  watchReview(head){
    this.reviewList=this.fdb.list("Andrapradesh/"+this.district+'/'+this.area+'/'+this.school+'/lecture/'+this.year4+'/standard/'+this.stand4+'/video/'+head+'/review').valueChanges();
   
  }

}
