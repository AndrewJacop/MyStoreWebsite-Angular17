import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  input,
} from '@angular/core';

@Directive({
  selector: '[MyBorder]',
  standalone: true,
})
export class MyBorderDirective {
  @Input() MyBorder = '';
  constructor(public eleRef: ElementRef) {
    this.eleRef.nativeElement.style.borderRadius = '10px';
    this.eleRef.nativeElement.style.boxShadow = '1px 1px 1px 1px grey';
  }
  @HostListener('mouseover') funIn() {
    this.eleRef.nativeElement.style.backgroundColor = `${this.MyBorder}`;
    this.eleRef.nativeElement.style.boxShadow = '2px 2px 2px 2px grey';
  }
  @HostListener('mouseout') funOut() {
    this.eleRef.nativeElement.style.backgroundColor = '#fff';
    this.eleRef.nativeElement.style.boxShadow = '1px 1px 1px 1px grey';
  }
}
