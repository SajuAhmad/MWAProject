import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from '../components/userlist/adminpanel.component';
import { RouterModule } from '@angular/router';
import { TokenGuard } from '../guards/tokenguard.guard';
import { AdminGuard } from '../guards/admin.guard';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    RouterModule.forChild([{ path: '', component: AdminPanelComponent, canActivate: [TokenGuard, AdminGuard] }])
  ]
})
export class AdminModule { }
