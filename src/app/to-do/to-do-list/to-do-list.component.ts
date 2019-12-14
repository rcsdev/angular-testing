import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { ToDo } from '../to-do.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.sass']
})
export class ToDoListComponent implements OnInit {
  /**
   * To-Do list
   */
  toDoList: ToDo[];
  /**
   * Last To-Do edited / added.. 
   */
  toDo: ToDo;
  /**
   * To-Do list request subscription
   * (Not needed, just as an example of how to 
   * work with ngOnDestroy and Observables)
   * Note: Angular Http service uses finite Observables
   */
  $toDos: Subscription;
  /**
   * Constructor
   */
  constructor(
    private toDoService: ToDoService
  ) { }
  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.getToDos();
  }
  /**
   * OnDestroy implementation
   */
  ngOnDestroy() {
    this.$toDos.unsubscribe();
  }
  /**
   * Retrieves all To-Dos
   */
  getToDos() {
    this.$toDos = this.toDoService.getToDos().subscribe((toDos: ToDo[]) => {
      this.toDoList = this.toDoService.updateToDosStatus(toDos);
    });
  }
  /**
   * Adds a new To-Do to the list
   * @param toDoToAdd The To-Do to add
   */
  addTodo(toDoToAdd: ToDo) {
    this.toDoService.addToDo(toDoToAdd).subscribe((toDo: ToDo) => {
      this.toDo = toDo;
      this.getToDos();
    });
  }
  /**
   * Removes a To-Do from the list
   * @param toDoToRemove The To-Do to remove
   */
  deleteToDo(toDoToRemove: ToDo) {
    this.toDoService.deleteToDo(toDoToRemove).subscribe(() => {
      this.getToDos();
    });
  }
  /**
   * Updates a To-Do from the list
   * @param toDoToUpdate The To-Do to update
   */
  updateToDo (toDoToUpdate: ToDo) {
    this.toDoService.updateToDo(toDoToUpdate).subscribe((toDo: ToDo) => {
      this.toDo = toDo;
      this.getToDos();
    });
  }
  /**
   * Checks or unchecks a To-Do by updating
   * its status
   * @param toDoToUpdate The To-Do to update
   */
  checkToDo(toDoToUpdate: ToDo) {
    const _toDoToUpdate = this.updateToDoInfo(toDoToUpdate);
    this.toDoService.updateToDo(_toDoToUpdate).subscribe((toDo: ToDo) => {
      this.toDo = toDo;
      this.getToDos();
    });
  }
  /**
   * Updates a To-Do status and updates its
   * updatedAt date field
   * @param toDoToUpdate The To-Do to update
   */
  updateToDoInfo (toDoToUpdate: ToDo): ToDo {
    toDoToUpdate.status = toDoToUpdate.status === 'Done' ? 'ToDo' : 'Done';
    if (new Date(toDoToUpdate.dueDate) < new Date()) {
      toDoToUpdate.status = 'Old';
    }
    toDoToUpdate.updatedAt = new Date();
    return toDoToUpdate;
  }
}