import { TestBed } from '@angular/core/testing';

import { ToDoService } from './to-do.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

export const _toDos = [
  {
    "id": 1,
    "title": "My First Task",
    "status": "ToDo"
  },
  {
    "id": 2,
    "title": "My Second Task",
    "status": "Done"
  },
  {
    "id": 3,
    "title": "My Third Task",
    "status": "ToDo"
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

  it('should return an array of ToDos', () => {
    service.getToDos().subscribe((toDos) => {
      expect(toDos.length).toBe(_toDos.length);
      for(let i = 0; i < toDos.length; i++){
        expect(toDos[i].id).toEqual(_toDos[i].id);
      }
    });

    const req = httpMock.expectOne(`${service.API_URL}/todos`);
    expect(req.request.method).toBe("GET");

    req.flush(_toDos);
  });
});


