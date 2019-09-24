import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../components/register/signup.component';
import { RouterModule } from '@angular/router';
import { DialogComponent } from '../components/dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [SignupComponent, DialogComponent],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: SignupComponent }])
  ],
  entryComponents: [DialogComponent]
})
export class SignupModule { }
