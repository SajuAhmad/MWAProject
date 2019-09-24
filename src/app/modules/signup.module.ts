import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../components/register/signup.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: SignupComponent }])
  ]
})
export class SignupModule { }
