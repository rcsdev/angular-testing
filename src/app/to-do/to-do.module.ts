import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoComponent } from './to-do/to-do.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AddToDoComponent } from './add-to-do/add-to-do.component';
import { ToDoService } from './to-do.service';
import { EditableToDoComponent } from './editable-to-do/editable-to-do.component';
import { ReadOnlyToDoComponent } from './read-only-to-do/read-only-to-do.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';

@NgModule({
  declarations: [
    ToDoComponent,
    AddToDoComponent,
    EditableToDoComponent,
    ReadOnlyToDoComponent,
    ToDoListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    ToDoListComponent
  ],
  providers: [
    ToDoService
  ]
})
export class ToDoModule { }
