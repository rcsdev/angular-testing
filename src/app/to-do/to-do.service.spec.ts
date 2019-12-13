import { TestBed } from '@angular/core/testing';

import { ToDoService } from './to-do.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToDo } from './to-do.models';

export const mockedtoDos = [
  {
    id: 1,
    title: 'My First Task',
    status: 'ToDo'
  },
  {
    id: 2,
    title: 'My Second Task',
    status: 'Done'
  },
  {
    id: 3,
    title: 'My Third Task',
    status: 'ToDo'
  }
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

  it('should return an array of ToDos when get method is called', () => {
    service.getToDos().subscribe((toDos) => {
      expect(toDos.length).toBe(mockedtoDos.length);
      for(let i = 0; i < toDos.length; i++){
        expect(toDos[i].id).toEqual(mockedtoDos[i].id);
      }
    });

    const req = httpMock.expectOne(`${service.API_URL}/todos`);
    expect(req.request.method).toBe('GET');

    req.flush(mockedtoDos);
  });

  it('should remove the requested To-Do when delete method is called', () => {
    const toDoToRemove = {
      id: 3,
      title: 'My Third Task',
      status: 'ToDo'
    } as ToDo;
    service.deleteToDo(toDoToRemove).subscribe(() => {
      service.getToDos().subscribe((toDos) => {
        expect(toDos.length).toBe(2);
      });
    });

    const req = httpMock.expectOne(`${service.API_URL}/todos/${toDoToRemove.id}`);
    expect(req.request.method).toBe('DELETE');
  });
});


