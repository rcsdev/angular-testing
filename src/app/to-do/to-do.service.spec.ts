import { TestBed } from '@angular/core/testing';

import { ToDoService } from './to-do.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToDo } from './to-do.models';

export const mockedToDos = [
  { id: 1, title: 'My First Task', status: 'ToDo' },
  { id: 2, title: 'My Second Task', status: 'Done' },
  {id: 3, title: 'My Third Task', status: 'ToDo' }
];

describe('ToDoService', () => {

  let service: ToDoService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ToDoService
      ]
    });
    service = TestBed.get(ToDoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // Ensures that there are no outstanding requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of ToDos', () => {
    service.getToDos().subscribe((toDos) => {
      expect(toDos.length).toBe(mockedToDos.length);
      for(let i = 0; i < toDos.length; i++){
        expect(toDos[i].id).toEqual(mockedToDos[i].id);
      }
    });

    const req = httpMock.expectOne(`${service.API_URL}/todos`);
    expect(req.request.method).toBe('GET');

    req.flush(mockedToDos);
  });

  it('should delete a To-Do if requested', () => {
    const toDoToDelete = mockedToDos[2] as ToDo;
    service.deleteToDo(toDoToDelete).subscribe(() => {
      service.getToDos().subscribe((toDos: ToDo[]) => {
        expect(toDos.length).toBe(2);
      });
    });
    const req = httpMock.expectOne(`${service.API_URL}/todos/${toDoToDelete.id}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('should add a new To-Do if requested', () => {
    const toDoToCreate = { id: 4, title: 'My New Task', status: 'ToDo' } as ToDo;
    service.addToDo(toDoToCreate).subscribe((toDoCreated: ToDo) => {
      expect(toDoCreated).toBe(toDoToCreate);
    });
    const req = httpMock.expectOne(`${service.API_URL}/todos/`);
    expect(req.request.method).toBe('POST');
  });

  it('should update a To-Do if requested', () => {
    const toDoToUpdate = { id: 3, title: 'My New Task', status: 'ToDo' } as ToDo;
    service.updateToDo(toDoToUpdate).subscribe((toDoUpdated: ToDo) => {
      expect(toDoUpdated).toBe(toDoToUpdate);
    });
    const req = httpMock.expectOne(`${service.API_URL}/todos/${toDoToUpdate.id}`);
    expect(req.request.method).toBe('PATCH');
  });
});


