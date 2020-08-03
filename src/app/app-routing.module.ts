import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentComponent } from './component/component.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { SchoolHomeComponent } from './school-home/school-home.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { SchoolGpsComponent } from './school-gps/school-gps.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { GpsUserComponent } from './gps-user/gps-user.component';
import { SchoolTraceComponent } from './school-trace/school-trace.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'view/:district/:area/:school',component:WelcomeComponent},
  {path:"dashboard",component:SchoolHomeComponent},
  {path:"signUp",component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'schoolmap',component:MapComponent},
  {path:'schoolmap/:district/:area/:school/info',component:SchoolGpsComponent},
  {path:'document',component:DocumentationComponent},
  {path:'schoolmap/:district/:area/:school',component:ComponentComponent},
  {path:'scheme',component:LoginComponent},
  {path:'galarey',component:HeaderComponent},
  {path:'userstate',component: GpsUserComponent},
  {path:'usermap/:lat/:lng/show',component:SchoolTraceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
