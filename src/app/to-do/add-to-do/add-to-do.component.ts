import { Component, Output, EventEmitter } from '@angular/core';
import { ToDo, ToDoStatus } from '../to-do.models';

@Component({
  selector: 'my-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.sass']
})
export class AddToDoComponent {
  /**
  *  Add new ToDo action event emitter
  */
  @Output()
  public createToDo: EventEmitter<ToDo>;
  /**
  *  ToDo description (title)
  */
  public description: string;
  /**
  *  ToDo task due date
  */
  public dueDate: Date;
  /**
   * Constructor
   */
  constructor() {
    this.createToDo = new EventEmitter<ToDo>();
    this.init();
  }
  /**
   * Component initializer method
   */
  init() {
    this.description = 'New ToDo';
    this.setDueDate();
  }
  /**
   * Establishes default due date value (and time)
   */
  setDueDate() {
    this.dueDate = new Date();
    const extendedDueDate = new Date();
    // Set to end of the day
    extendedDueDate.setHours(23);
    extendedDueDate.setMinutes(59);
    extendedDueDate.setSeconds(59);
    extendedDueDate.setDate(this.dueDate.getDate() + 1);
    this.dueDate = extendedDueDate;
  }
  /**
   * Will emit a new ToDo to create
   */
  addToDo() {
    const newToDo = this.generateToDo();
    this.createToDo.emit(newToDo);
    this.init();
  }
  /** Returns a new To-Do to be created */
  generateToDo() {
    return {
      id: Math.floor(Math.random() * (100000000 - 0)),
      title: this.description,
      status: 'ToDo' as ToDoStatus,
      createdAt: new Date(),
      dueDate: this.dueDate
    }
  }
  /**
   * Updates ToDo description
   * @param event description event value
   */
  updateDescription(event: Event) {
    this.description = (event.target as HTMLInputElement).value;
  }
  /**
   * Updates ToDo dueDate date
   * @param event dueDate event value (date)
   */
  updateDueDate(event: Event) {
    const newDate = new Date((event.target as HTMLInputElement).value);
    this.dueDate.setDate(newDate.getDate());
  }
  /**
   * Updates ToDo dueDate time
   * @param event dueDate event value (time)
   */
  updateDueTime(event: Event) {
    const hours = +((event.target as HTMLInputElement).value).split(':')[0];
    const minutes = +((event.target as HTMLInputElement).value).split(':')[1];
    this.dueDate.setHours(hours);
    this.dueDate.setMinutes(minutes);
    this.dueDate.setSeconds(59);
  }
}

