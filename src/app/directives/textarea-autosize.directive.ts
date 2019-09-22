import { Directive, ElementRef, Renderer2, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextareaAutosize]'
})
export class TextareaAutosizeDirective implements OnInit{

  @Input() appTextareaAutosize: string;
  constructor(public e: ElementRef, public r: Renderer2) {

  }



  ngOnInit() {
    // Use renderer to render the emelemt with styles
    this.r.setStyle(this.e.nativeElement, 'height', this.appTextareaAutosize);
    this.r.setStyle(this.e.nativeElement, 'overflow', 'hidden');
  }

  @HostListener('input') onChange() {
    this.r.setStyle(this.e.nativeElement, 'height', this.appTextareaAutosize);
    const height = (this.e.nativeElement.scrollHeight) + 'px';
    this.r.setStyle(this.e.nativeElement, 'height', height);


  }
}
