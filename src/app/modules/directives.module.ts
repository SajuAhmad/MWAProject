import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaAutosizeDirective } from '../directives/textarea-autosize.directive';



@NgModule({
  declarations: [TextareaAutosizeDirective],
  imports: [
    CommonModule
  ],
  exports: [
    TextareaAutosizeDirective
  ]
})
export class DirectivesModule { }
