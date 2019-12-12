import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AddToDoComponent } from './add-to-do/add-to-do.component';
import { ToDoService } from './to-do.service';
import { EditableToDoComponent } from './editable-to-do/editable-to-do.component';

@NgModule({
  declarations: [
    AddToDoComponent,
    EditableToDoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    AddToDoComponent
  ],
  providers: [
    ToDoService
  ]
})
export class ToDoModule { }
