import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
//import { Rating } from 'ng2-rating';
import { RatingsComponent } from './ratings.component';
//import { Slider } from './slider.component';

@Component({
  selector: 'aseessment-view',
  templateUrl: './Assessment.component.html',
  styleUrls: ['./Assessment.component.css']
})
export class AssessmentComponent implements OnInit{

  // Public variables for input and output
  @Input()
  assessmentOption:string = 'No Assessment';
  @Output() 
  assessmentOptionChange:EventEmitter<string> = new EventEmitter<string>();

  @Input()
  assessmentRating:number = 0;
  @Output() 
  assessmentRatingChange:EventEmitter<number> = new EventEmitter<number>();

  @Input()
  confidenceRating:number = 2.5;
  @Output() 
  confidenceRatingChange:EventEmitter<number> = new EventEmitter<number>();

  
  //Internal private variables
  private agreeRating: number = 0;
  private disagreeRating: number = 0;
  private selectedComboOption:string;
  private comboOptions = ['No Assessment', 'No Support', 'Agree', 'Disagree'];
  private IsEditMode:boolean = false;
  private currentConfidenceRating:number;

  temp = [1,2,3,4,5];

  constructor(){
   
  }

  ngOnInit(){

      this.selectedComboOption = this.assessmentOption;

      if(this.assessmentOption == 'Agree')
        this.agreeRating = this.assessmentRating;
      else if(this.assessmentOption == 'DisAgree')
        this.disagreeRating = this.assessmentRating;

    this.currentConfidenceRating = this.confidenceRating;
    
  }

  onEndHover(event:any){
    //console.log('onEndHover: ' + event);
  
  }

  onStarHover(event:any){
    //console.log('onStarHover: ' + event);    
   
  }

  onStarSelected(event:any){
    //console.log('onStarSelected: ' + event); 
    if(event == null){
      this.IsEditMode = true;
    }  
   
  }

  onProbabilityChanged(event:any){
    //this.currentConfidenceRating = (event/25)*100;
  }

  onComboChange(newVal:any){
      this.selectedComboOption = newVal;
  }

  onSave(){
    this.assessmentOption = this.selectedComboOption;
    this.confidenceRating = this.currentConfidenceRating;

    if(this.assessmentOption === this.comboOptions[2])
      this.assessmentRating = this.agreeRating;
    else if(this.assessmentOption === this.comboOptions[3])
      this.assessmentRating = this.disagreeRating;
    else{ 
        this.assessmentRating = 0;
        this.confidenceRating = 0;
    }
      
      this.IsEditMode = false;

      this.assessmentOptionChange.emit(this.assessmentOption);
      this.assessmentRatingChange.emit(this.assessmentRating);
      
      //convert confidence rating into percentage and emit
      this.confidenceRatingChange.emit(this.confidenceRating*20);
  }

  onCancel(){
    this.selectedComboOption = this.assessmentOption;
    if(this.assessmentOption === this.comboOptions[2])
      this.agreeRating = this.assessmentRating;
    else if(this.assessmentOption === this.comboOptions[3])
      this.disagreeRating = this.assessmentRating;

      this.currentConfidenceRating = this.confidenceRating;
      this.IsEditMode = false;

  }

  onEditMode(){
    this.IsEditMode = true;
  }

}
