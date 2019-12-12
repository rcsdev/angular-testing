import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoComponent } from './to-do.component';
import { emptyToDo } from '../to-do.models';
import { SharedModule } from 'src/app/shared/shared.module';
import { MockComponent } from 'ng-mocks';
import { EditableToDoComponent } from '../editable-to-do/editable-to-do.component';
import { ReadOnlyToDoComponent } from '../read-only-to-do/read-only-to-do.component';

describe('ToDoComponent', () => {
  let component: ToDoComponent;
  let fixture: ComponentFixture<ToDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToDoComponent,
        MockComponent(EditableToDoComponent),
        MockComponent(ReadOnlyToDoComponent)
      ],
      imports: [ 
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be an emptyToDo if set to null', () => {
    component.toDo = null;
    component.ngOnChanges();
    expect(component.toDo).toEqual(emptyToDo);
  });

  it('should be an emptyToDo if set to undefined', () => {
    component.toDo = undefined;
    component.ngOnChanges();
    expect(component.toDo).toEqual(emptyToDo);
  });

  it('should be do nothing if the current toDo is a valid toDo', () => {
    component.toDo = emptyToDo;
    component.ngOnChanges();
    expect(component.toDo).toEqual(emptyToDo);
  });

});
