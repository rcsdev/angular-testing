import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyToDoComponent } from './read-only-to-do.component';
import { MockComponent } from 'ng-mocks';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { emptyToDo } from '../to-do.models';
import { By } from '@angular/platform-browser';

describe('ReadOnlyToDoComponent', () => {
  let component: ReadOnlyToDoComponent;
  let fixture: ComponentFixture<ReadOnlyToDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReadOnlyToDoComponent,
        MockComponent(ButtonComponent)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOnlyToDoComponent);
    component = fixture.componentInstance;
    component.toDo = emptyToDo;
    component.toDo.dueDate = new Date();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.toDo).toBeDefined();
  });

  it('should emit a To-Do if Check button is clicked', () => {
    spyOn(component.checkToDo, 'emit');
    const myCheckBtn = fixture.debugElement.query(By.css('.check-btn')).nativeElement;
    myCheckBtn.click();
    fixture.detectChanges();
    expect(component.checkToDo.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit a To-Do if Edit button is clicked', () => {
    spyOn(component.editToDo, 'emit');
    const myEditBtn = fixture.debugElement.query(By.css('.edit-btn')).nativeElement;
    myEditBtn.click();
    fixture.detectChanges();
    expect(component.editToDo.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit a To-Do if Delete button is clicked', () => {
    spyOn(component.deleteToDo, 'emit');
    const myDeleteBtn = fixture.debugElement.query(By.css('.delete-btn')).nativeElement;
    myDeleteBtn.click();
    fixture.detectChanges();
    expect(component.deleteToDo.emit).toHaveBeenCalledTimes(1);
  });

  it('getMarkStatus() should return "Mark as undone" if a To-Do has "Done" status', () => {
    component.toDo.status = 'Done';
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      expect(component.getMarkStatus()).toBe('Mark as undone');
    });
  });

  it('getMarkStatus() should return "Due date expired" if a To-Do has "Old" status', () => {
    component.toDo.status = 'Old';
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      expect(component.getMarkStatus()).toBe('Due date expired');
    });
  });

  it('getMarkStatus() should return "Mark as done" by default', () => {
    component.toDo.status = 'ToDo';
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      expect(component.getMarkStatus()).toBe('Mark as done');
    });
  });
});
