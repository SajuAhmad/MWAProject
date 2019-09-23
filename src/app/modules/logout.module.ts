import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../components/logout/logout.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [LogoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LogoutComponent }])
  ]
})
export class LogoutModule {
  constructor() { console.log('logout module'); }
}
