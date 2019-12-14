import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableToDoComponent } from './editable-to-do.component';
import { MockComponent } from 'ng-mocks';
import { ButtonComponent } from 'src/app/shared/button/button.component';

describe('EditableToDoComponent', () => {
  let component: EditableToDoComponent;
  let fixture: ComponentFixture<EditableToDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        EditableToDoComponent,
        MockComponent(ButtonComponent)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
