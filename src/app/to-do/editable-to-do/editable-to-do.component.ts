import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDo, emptyToDo } from '../to-do.models';

@Component({
  selector: 'my-editable-to-do',
  templateUrl: './editable-to-do.component.html',
  styleUrls: ['./editable-to-do.component.sass']
})
export class EditableToDoComponent {
  /**
   * To-Do model reference
   */
  @Input()
  toDo: ToDo;
  /**
   * An emitter for To-Do's delete
   * button
   */
  @Output()
  deleteToDo: EventEmitter<ToDo>;
  /**
   * An emitter for To-Do's save
   * button
   */
  @Output()
  saveToDo: EventEmitter<ToDo>;
  /**
   * An emitter for To-Do's cancel
   * button
   */
  @Output()
  cancelToDo: EventEmitter<ToDo>;
  /**
   * Constructor
   */
  constructor() {
    this.toDo = emptyToDo;
    this.deleteToDo = new EventEmitter<ToDo>();
    this.saveToDo = new EventEmitter<ToDo>();
    this.cancelToDo = new EventEmitter<ToDo>();
  }
  /**
   * Emits a To-Do to save it
   */
  updateToDo() {
    this.saveToDo.emit(this.toDo);
  }
  /**
   * Emits a To-Do to remove it
   */
  removeToDo() {
    this.deleteToDo.emit(this.toDo);
  }
  /**
   * Emits a To-Do to cancel 
   * edition mode
   */
  cancelEdit() {
    this.cancelToDo.emit(this.toDo);
  }
  /**
   * Updates a To-Do title
   * when user inputs a text for
   * the input
   */
  updateTitle(event: Event) {
    this.toDo.title = (event.target as HTMLInputElement).value;
  }
  /**
   * Updates a To-Do due date
   * when user inputs a date for
   * the input
   */
  updateDueDate(event: Event) {
    this.toDo.dueDate = new Date((event.target as HTMLInputElement).value);
    this.updateToDoStatus();
  }
  /**
   * Updates a To-Do status
   * after updating its due date
   */
  updateToDoStatus() {
    if (new Date(this.toDo.dueDate) > new Date()) {
      this.toDo.status = 'ToDo';
    } else {
      this.toDo.status = 'Old';
    }
  }
  /**
   * Updates ToDo dueDate time
   * @param event dueDate event value (time)
   */
  updateDueTime(event: Event) {
    const hours = +((event.target as HTMLInputElement).value).split(':')[0];
    const minutes = +((event.target as HTMLInputElement).value).split(':')[1];
    const newTime = new Date(this.toDo.dueDate);
    newTime.setHours(hours);
    newTime.setMinutes(minutes);
    newTime.setSeconds(59);
    this.toDo.dueDate = newTime;
    this.updateToDoStatus();
  }
}
