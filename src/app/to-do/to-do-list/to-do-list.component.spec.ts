import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { ToDoListComponent } from './to-do-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { ToDo } from '../to-do.models';
import { AddToDoComponent } from '../add-to-do/add-to-do.component';
import { ToDoComponent } from '../to-do/to-do.component';

describe('ToDoListComponent', () => {
  let component: ToDoListComponent;
  let fixture: ComponentFixture<ToDoListComponent>;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [
        ToDoListComponent,
        MockComponent(AddToDoComponent),
        MockComponent(ToDoComponent)
      ],
      providers: [
        ToDoService
      ],
      schemas:[ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
