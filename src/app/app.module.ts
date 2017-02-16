import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';

//import { RatingModule } from 'ng2-rating';
//import { RatingModule } from 'ng2-bootstrap';
//import { Ng2SliderComponent } from 'ng2-slider-component/ng2-slider.component';

import { AppComponent } from './app.component';
import { AssessmentComponent } from './Assessment.component'
import { RatingsComponent } from './ratings.component';
//import { Slider } from './slider.component';

@NgModule({
  declarations: [
    AppComponent, AssessmentComponent,
    RatingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
