import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ToDo, emptyToDo } from '../to-do.models';
import { isNil, isEmpty } from 'lodash';


@Component({
  selector: 'mysphr-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.sass']
})
export class ToDoComponent implements OnChanges {
  /**
   * Todo model reference
   */
  @Input()
  toDo: ToDo;
  /**
   * A To-Do emitter when the user wants
   * to check or uncheck this task
   */
  @Output()
  markToDo: EventEmitter<ToDo>;
  /**
   * A To-Do emitter when the user wants
   * to delete this task
   */
  @Output()
  deleteToDo: EventEmitter<ToDo>;
  /**
   * A To-Do emitter when the user wants
   * to update this task
   */
  @Output()
  updateToDo: EventEmitter<ToDo>;
  /**
   * To-Do edition mode enabler
   */
  editMode: boolean;
  /**
   * Constructor
   */
  constructor() {
    this.toDo = emptyToDo;
    this.editMode = false;
    this.markToDo = new EventEmitter<ToDo>();
    this.deleteToDo = new EventEmitter<ToDo>();
    this.updateToDo = new EventEmitter<ToDo>();
  }
  /**
   * OnChanges implementation
   */
  ngOnChanges(): void {
    if ( isNil(this.toDo) || isEmpty(this.toDo) ) {
      this.toDo = emptyToDo;
    }
  }
  /**
   * Emits a To-Do when the user wants
   * to check or uncheck this task
   */
  markAsDone(toDo: ToDo) {
    this.markToDo.emit(toDo);
  }
  /**
   * Emits a To-Do when the user wants
   * to save this task
   */
  saveToDo(toDo: ToDo) {
    this.updateToDo.emit(toDo);
  }
  /**
   * Emits a To-Do when the user wants
   * to delete this task
   */
  removeToDo(toDo: ToDo) {
    this.deleteToDo.emit(toDo);
  }
  /**
   * Toggles To-Do edition mode
   */
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}