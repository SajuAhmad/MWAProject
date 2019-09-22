import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Directive({
  selector: '[isVisitor]'
})
export class VisitorDirective {

  constructor(private e: ElementRef, private r: Renderer2, private atuhService: AuthService) {
    this.hide(e, r);
  }

  hide(e, r) {
    if (localStorage.getItem('userToken')) {
      r.setStyle(e.nativeElement, 'display', 'none');
    }
  }

}
