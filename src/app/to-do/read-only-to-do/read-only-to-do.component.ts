import { Component, EventEmitter, Input, Output } from '@angular/core';
import { emptyToDo, ToDo } from '../to-do.models';

@Component({
  selector: 'my-read-only-to-do',
  templateUrl: './read-only-to-do.component.html',
  styleUrls: ['./read-only-to-do.component.sass']
})
export class ReadOnlyToDoComponent {
  /**
   * To-Do model reference
   */
  @Input()
  toDo: ToDo;
  /**
   * An emitter for To-Do's status
   * button
   */
  @Output()
  checkToDo: EventEmitter<ToDo>;
  /**
   * An emitter for To-Do's delete
   * button
   */
  @Output()
  deleteToDo: EventEmitter<ToDo>;
  /**
   * An emitter for To-Do's edit
   * button
   */
  @Output()
  editToDo: EventEmitter<ToDo>;
  /**
   * Constructor
   */
  constructor() {
    this.toDo = emptyToDo;
    this.checkToDo = new EventEmitter<ToDo>();
    this.deleteToDo = new EventEmitter<ToDo>();
    this.editToDo = new EventEmitter<ToDo>();
  }
  /**
   * Emits a To-Do to check its status
   */
  goCheckToDo() {
    this.checkToDo.emit(this.toDo);
  }
  /**
   * Emits a To-Do to remove it
   */
  removeToDo() {
    this.deleteToDo.emit(this.toDo);
  }
  /**
   * Emits a To-Do to change to
   * edit mode
   */
  toggleEditMode() {
    this.editToDo.emit(this.toDo);
  }
  /**
   * Returns true if a ToDo due date has expired
   */
  isOldToDo() {
    return new Date(this.toDo.dueDate) < new Date();
  }
  /**
   * Helper view method to retrieve current
   * To-Do status action description
   */
  getMarkStatus() {
    switch(this.toDo.status) {
      case 'Done':
        return 'Mark as undone';
      case 'Old':
        return 'Due date expired';
      default:
        // 'ToDo' by default
        return 'Mark as done';
    }
  }
  /**
   * Helper view method to retrieve current
   * To-Do css class based on its status
   */
  getDueDateStatus() {
    switch(this.toDo.status) {
      case 'Done':
        return 'due-date-succeded';
      case 'Old':
        return 'due-date-expired';
      default:
        // 'ToDo' by default
        return this.isNearDueDate() ? 'due-date-warning' : '';
    }
  }
  /**
   * Returns true if current To-Do
   * due date its going to expire soon
   */
  isNearDueDate() {
    const _date = new Date(this.toDo.dueDate);
    _date.setDate(_date.getDate() - 1);
    return this.toDo && this.toDo.status === 'ToDo' && _date <= new Date();
  }
}
