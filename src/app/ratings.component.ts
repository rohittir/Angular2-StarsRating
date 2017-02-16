import { Component, OnInit, Input, Output, EventEmitter, HostListener, forwardRef, NgModule } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'ratings-view',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css'],

  providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RatingsComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => RatingsComponent), multi: true },
    ],

})
export class RatingsComponent implements OnInit, ControlValueAccessor, Validator {
    
     // -------------------------------------------------------------------------
    // Inputs
    // -------------------------------------------------------------------------

    @Input()
    iconClass = "star-icon";

    @Input()
    fullIcon = "★";

    @Input()
    emptyIcon = "☆";

    @Input()
    iconFontSize = "1.0em"

    @Input()
    readonly: boolean;

    @Input()
    disabled: boolean;

    @Input()
    required: boolean;

    @Input()
    float: boolean;

    @Input()
    titles: string[] = [];

    @Input()
    assessment: boolean = false;

    @Input()
    iconColor:string = "green";

    @Input()
    customFont:string = "";

    // -------------------------------------------------------------------------
    // Input Accessors
    // -------------------------------------------------------------------------

    @Input()
    set max(max: number) {
        this._max = max;
        this.buildRanges();
    }

    get max() {
        return this._max;
    }

    // -------------------------------------------------------------------------
    // Outputs
    // -------------------------------------------------------------------------

    @Output()
    onHover = new EventEmitter();

    @Output()
    onLeave = new EventEmitter();

    @Output()
    onSelected = new EventEmitter();

    @Input()
    fullImage:string = './assets/images/star-green_full.png';

    @Input()
    halfImage:string = './assets/images/star-green_half.png';

    @Input()
    emptyImage:string = './assets/images/star-green_empty.png';

    @Input()
    IsCloserIcons:boolean = false;

    IconPosition:string = 'relative';

    // -------------------------------------------------------------------------
    // Public properties
    // -------------------------------------------------------------------------

    model: number;
    ratingRange: number[];
    hovered: number = 0;
    hoveredPercent: number = undefined;

    assemssmentValue:string;
    hoveringAssessment:string;

    // -------------------------------------------------------------------------
    // Private Properties
    // -------------------------------------------------------------------------

    private _max: number = 5;
    private onChange: (m: any) => void;
    private onTouched: (m: any) => void;

    // -------------------------------------------------------------------------
    // Implemented from ControlValueAccessor
    // -------------------------------------------------------------------------

    writeValue(value: number): void {
        /*if (value % 1 !== value) {
         this.model = Math.round(value);
         return;
         }*/

        this.model = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    // -------------------------------------------------------------------------
    // Implemented from Va..
    // -------------------------------------------------------------------------

    validate(c: AbstractControl) {
        if (this.required && !c.value) {
            return {
                required: true
            };
        }
        return null;
    }

    // -------------------------------------------------------------------------
    // Lifecycle callbacks
    // -------------------------------------------------------------------------

    ngOnInit() {
        this.buildRanges();
        this.assemssmentValue = this.getAssessment(this.model);
    }

    // -------------------------------------------------------------------------
    // Host Bindings
    // -------------------------------------------------------------------------

    @HostListener("keydown", ["$event"])
    onKeydown(event: KeyboardEvent): void {
        if ([37, 38, 39, 40].indexOf(event.which) === -1 || this.hovered)
            return;

        event.preventDefault();
        event.stopPropagation();
        const increment = this.float ? 0.5 : 1;
        this.rate(this.model + (event.which === 38 || event.which === 39 ? increment : increment * -1));
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    getIcon(item: number){
        let actualIcon = this.emptyImage;
        let hoveredWidthPer = this.calculateWidth(item);
        if(hoveredWidthPer > 30 && hoveredWidthPer <= 80)
            actualIcon = this.halfImage;
        else if(hoveredWidthPer > 80)
            actualIcon = this.fullImage;
        
        //this.getIconPosition(item);

        return actualIcon;
    }

    getIconPosition(item:number){
        let hoveredWidthPer = this.calculateWidth(item);
        this.IconPosition = 'relative';
        if(hoveredWidthPer > 30)
            this.IconPosition = 'absolute';

    return this.IconPosition;
    }


    calculateWidth(item: number) {
        if (this.hovered > 0) {
            if (this.hoveredPercent !== undefined && this.hovered === item)
                return this.hoveredPercent;

            return this.hovered >= item ? 100 : 0;
        }
        return this.model >= item ? 100 : 100 - Math.round((item - this.model) * 10) * 10;
    }

    setHovered(hovered: number): void {
        if (!this.readonly && !this.disabled) {
            this.hovered = hovered;
            this.onHover.emit(hovered);
            this.hoveringAssessment = this.getAssessment(hovered);
        }
    }

    changeHovered(event: MouseEvent): void {
        if (!this.float) return;
        const target = event.target as HTMLElement;
        const relativeX = event.pageX - target.offsetLeft;
        const percent = Math.round((relativeX * 100 / target.offsetWidth) / 10) * 10;
        this.hoveredPercent = percent > 50 ? 100 : 50;
    }

    resetHovered() {
        this.hovered = 0;
        this.hoveredPercent = undefined;
        this.onLeave.emit(this.hovered);
        this.hoveringAssessment = this.assemssmentValue;
    }


    rate(value: number) {
        if (!this.readonly && !this.disabled && value >= 0 && value <= this.ratingRange.length) {
            const newValue = this.hoveredPercent ? (value - 1) + this.hoveredPercent / 100 : value;
            this.onChange(newValue);
            this.model = newValue;
            this.onSelected.emit(newValue);
            this.assemssmentValue = this.getAssessment(newValue);
            this.hoveringAssessment = this.assemssmentValue;
        }

        if(this.readonly)
            this.onSelected.emit(null);
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    private buildRanges() {
        this.ratingRange = this.range(1, this.max);
    }

    private range(start: number, end: number) {
        const foo: number[] = [];
        for (let i = start; i <= end; i++) {
            foo.push(i);
        }
        return foo;
    }

    onRatingChange(newValue:number){
        this.model = newValue? newValue/20 : newValue;
    }

    // new Methods
    getAssessment(starVal:number):string{
    let assesmVal:string = "";
    if(this.titles.length < 5)
        return assesmVal;
        
    if(starVal <= 1.0){
        assesmVal = this.titles[0];
    }
    else if(starVal <= 2.0){
        assesmVal = this.titles[1];
    }
    else if(starVal <= 3.0){
        assesmVal = this.titles[2];
    }
    else if(starVal <= 4.0){
        assesmVal = this.titles[3];
    }
    else if(starVal <= 5.0){
        assesmVal = this.titles[4];
    }
    
    return assesmVal;
  }

}
