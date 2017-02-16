import {Component, ElementRef, Inject, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';

declare var jQuery:any;

@Component({
    selector: 'slider',
    template: `
    &nbsp; &nbsp;
      <span style="position:relative">
        <div id="slider" style="display: inline-block"></div>
      <span> 
       &nbsp; &nbsp;
      `,

      styleUrls: ['./ratings.component.css'],
})

export class Slider implements AfterViewInit {
        
    @Input() slideValue: number = 0;    
    @Output() onSliderChanged = new EventEmitter();

    elementRef: ElementRef;
    visibility = 'hidden';
    
    constructor(@Inject(ElementRef) elementRef: ElementRef) {
      this.elementRef = elementRef;
    }

    updSlider() {
      jQuery(this.elementRef.nativeElement).find("#slider")
      .slider("option", "value", this.slideValue);      
    }

    ngAfterViewInit() { 

      jQuery(this.elementRef.nativeElement).find("#slider").slider({
        range: "min",
        orientation: "horizontal",
        min: 10,
        max: 25,
        animate: true,
        step: 5,
        value: this.slideValue,
        slide: ( event, ui ) => {
          this.slideValue = ui.value;
          this.visibility = "visible";
          jQuery(this.elementRef.nativeElement).find(".ui-slider-range").css({"background": "#FFFFcc"});
          this.onSliderChanged.emit(this.slideValue);
        }
      });

      jQuery(this.elementRef.nativeElement).find(".ui-slider-horizontal").css({"width": "100px"});
      //jQuery(this.elementRef.nativeElement).find(".float").css({"width": "left"});

    }
}