import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../service/auth.service';


@Directive({
  selector: '[isUser]'
})
export class UserDirective {

  constructor(private e: ElementRef, private r: Renderer2, private atuhService: AuthService) {
    this.hide(e, r);
  }

  hide(e, r) {
    if (this.atuhService.getRole() !== 'null' && this.atuhService.getRole() !== 'user' || this.atuhService.getRole() !== 'admin') {
      r.setStyle(e.nativeElement, 'display', 'none');
    }
  }

}
