import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImageClassifierComponent } from './image-classifier/image-classifier.component';
import { HomeComponent } from './home/home.component';
import { WebcamClassifierComponent } from './webcam-classifier/webcam-classifier.component';
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material';

const appRoutes: Routes = [
  {path: 'imageRecognition', component: ImageClassifierComponent},
  {path: 'webcamRecognition', component: WebcamClassifierComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ImageClassifierComponent,
    HomeComponent,
    WebcamClassifierComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
