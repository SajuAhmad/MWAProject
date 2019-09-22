import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Directive({
  selector: '[isAdmin]'
})
export class AdminDirective implements OnInit {

  @Input('isAdmin') isAdmin;

  constructor(private e: ElementRef, private r: Renderer2, private atuhService: AuthService) {
  }

  hide() {
    console.log('hide');
    this.r.setStyle(this.e.nativeElement, 'display', 'none');
  }

  ngOnInit(): void {
    console.log('before hide');
    if (this.isAdmin !== 'admin') {
      console.log('hiding');
      this.r.setStyle(this.e.nativeElement, 'display', 'none');
    } else {
      this.r.setStyle(this.e.nativeElement, 'display', 'inline');
    }
  }
}
