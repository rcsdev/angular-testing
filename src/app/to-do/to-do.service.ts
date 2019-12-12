import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToDo } from './to-do.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  /**
   * API URL
   */
  readonly API_URL = 'http://localhost:3000';
  /**
   * Constructor
   */
  constructor(
    private http: HttpClient
  ) { }
  /**
   * Retrieves all To-Dos stored
   */
  public getToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.API_URL}/todos`);
  } 
  /**
   * Deletes a To-Do by its id
   */
  public deleteToDo(toDoToDelete: ToDo) {
    return this.http.delete<ToDo>(`${this.API_URL}/todos/${toDoToDelete.id}`);
  }
  /**
   * Sends a new To-Do to the API
   * @param toDoToAdd ToDo to send to create
   */
  public addToDo(toDoToAdd: ToDo) {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<ToDo>(`${this.API_URL}/todos/`, toDoToAdd, options);
  }
  /**
   * Updates an old To-Do
   * @param toDoToUpdate the To-Do to update
   */
  public updateToDo(toDoToUpdate: ToDo) {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.patch<ToDo>(`${this.API_URL}/todos/${toDoToUpdate.id}`, toDoToUpdate, options);
  }
  /**
   * Updates the status of a To-Do list
   * @param toDos To-Do list to update
   */
  public updateToDosStatus(toDos: ToDo[]) {
    toDos.forEach( (toDo)=>{
      const isDueDateExpired = new Date(toDo.dueDate) < new Date();
      const isToDoDone = toDo.status === 'Done';
      toDo.status = !isToDoDone && isDueDateExpired ? 'Old' : toDo.status;
    });
    return toDos;
  }
}
