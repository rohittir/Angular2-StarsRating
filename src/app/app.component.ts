import { Component, ViewChild, OnInit } from '@angular/core';
import { AssessmentComponent } from './Assessment.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  assm1:string = 'Agree';
  assm2:number = 0.5;
  assm3:number = 2.0;
  constructor(){

  }

}
