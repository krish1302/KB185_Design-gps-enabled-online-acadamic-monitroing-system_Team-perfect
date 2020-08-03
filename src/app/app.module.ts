import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentComponent } from './component/component.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { SchoolHomeComponent } from './school-home/school-home.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { SchoolGpsComponent } from './school-gps/school-gps.component';
import { SchoolTraceComponent } from './school-trace/school-trace.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './welcome/welcome.component';
import { GpsUserComponent } from './gps-user/gps-user.component';



@NgModule({
  declarations: [
    AppComponent,
    ComponentComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    MapComponent,
    SchoolHomeComponent,
    DocumentationComponent,
    SchoolGpsComponent,
    SchoolTraceComponent,
    WelcomeComponent,
    GpsUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTabsModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    MatCardModule,
    MatFormFieldModule,
    AngularFireStorageModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyBDaTYsSOPORwdzRg9CS_2a0fLsm5UINmA"
    }),
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    CarouselModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    MatExpansionModule,
    NgbModule,
    MatProgressSpinnerModule
  ],
  exports:[FormsModule],
  providers: [{ provide: BUCKET, useValue: 'gs://smartsystem-8ccf2.appspot.com/' }],
  bootstrap: [AppComponent]

})
export class AppModule { }
