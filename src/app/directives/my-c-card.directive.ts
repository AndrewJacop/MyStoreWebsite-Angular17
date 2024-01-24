import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[MyCCard]',
  standalone: true,
})
export class MyCCardDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @HostListener('blur') funBlur() {
    this.formatCreditCardNumber();
    let ccn: string = this.el.nativeElement.value;
    if (ccn.length == 0) {
      this.el.nativeElement.style.backgroundColor = 'white';
    } else if (ccn.length == 19) {
      this.el.nativeElement.style.backgroundColor = 'lightgray';
    } else {
      this.el.nativeElement.style.backgroundColor = 'red';
    }
  }
  private formatCreditCardNumber() {
    let ccn: string = this.el.nativeElement.value;
    if (ccn.length == 16) {
      let ccnFormat: string = ccn.replace(/(\d{4})/g, '$1-');
      ccnFormat = ccnFormat.substring(0, ccnFormat.length - 1);
      this.renderer.setProperty(this.el.nativeElement, 'value', ccnFormat);
    }
  }
}
