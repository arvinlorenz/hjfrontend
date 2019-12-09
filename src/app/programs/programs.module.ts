import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsRoutingModule } from './program-routing.module';
import { ProgramComponent } from './program.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProgramComponent],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProgramsModule { }
