import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableToDoComponent } from './editable-to-do.component';
import { MockComponent } from 'ng-mocks';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { By } from '@angular/platform-browser';
import { emptyToDo } from '../to-do.models';


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
    component.toDo = emptyToDo;
    component.toDo.dueDate = new Date();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.toDo).toBeDefined();
  });

  it('should emit a To-Do if Cancel/Save/Delete buttons are clicked', () => {
    spyOn(component.saveToDo, 'emit');
    spyOn(component.deleteToDo, 'emit');
    spyOn(component.cancelToDo, 'emit');
    const myCancelBtn = fixture.debugElement.query(By.css('.cancel-btn')).nativeElement;
    const mySaveBtn = fixture.debugElement.query(By.css('.save-btn')).nativeElement;
    const myDeleteBtn = fixture.debugElement.query(By.css('.delete-btn')).nativeElement;
    myCancelBtn.click();
    mySaveBtn.click();
    myDeleteBtn.click();
    expect(component.cancelToDo.emit).toHaveBeenCalledTimes(1);
    expect(component.saveToDo.emit).toHaveBeenCalledTimes(1);
    expect(component.deleteToDo.emit).toHaveBeenCalledTimes(1);
  });

  it ('should be able to edit To-Do title via template', () => {
    const myInput = fixture.debugElement.query(By.css('.title')).nativeElement;
    expect(myInput.value).toBe(component.toDo.title);
    myInput.value = 'New Task';
    myInput.dispatchEvent(new Event('change'));
    expect(component.toDo.title).toEqual('New Task');
  });

  it ('should be able to update the To-Do dueDate via template', () => {
    component.toDo.dueDate = new Date();
    fixture.detectChanges();
    spyOn(component, 'updateToDoStatus');
    const myInput = fixture.debugElement.query(By.css('.due-date')).nativeElement;
    expect(new Date(myInput.value).getDay()).toBe(component.toDo.dueDate.getDay());
    expect(new Date(myInput.value).getMonth()).toBe(component.toDo.dueDate.getMonth());
    expect(new Date(myInput.value).getFullYear()).toBe(component.toDo.dueDate.getFullYear());
    myInput.value = '2019-01-01';
    myInput.dispatchEvent(new Event('change'));
    const newDate = new Date(myInput.value);
    expect(component.toDo.dueDate.getDate()).toBe(newDate.getDate());
    expect(component.updateToDoStatus).toHaveBeenCalledTimes(1);
  });

  it ('should update To-Do status to Old if due date has been expired', () => {
    component.toDo.dueDate.setDate(new Date().getDate() - 1);
    component.updateToDoStatus();
    expect(component.toDo.status).toBe('Old');
  });

  it ('should leave To-Do status as ToDo if due date has not expired yet', () => {
    component.toDo.dueDate.setDate(new Date().getDate() + 1);
    component.updateToDoStatus();
    expect(component.toDo.status).toBe('ToDo');
  });

  it ('should be able to update the To-Do dueDate time via template', () => {
    component.toDo.dueDate = new Date();
    fixture.detectChanges();
    const myInput = fixture.debugElement.query(By.css('.due-time')).nativeElement;
    const newTime = new Date();
    fixture.detectChanges();
    newTime.setHours(myInput.value.split(':')[0]);
    newTime.setMinutes(myInput.value.split(':')[1]);
    expect(newTime.getHours()).toBe(component.toDo.dueDate.getHours());
    expect(newTime.getMinutes()).toBe(component.toDo.dueDate.getMinutes());
    myInput.value = '22:00';
    myInput.dispatchEvent(new Event('change'));
    expect(component.toDo.dueDate.getHours()).toEqual(22);
    expect(component.toDo.dueDate.getMinutes()).toEqual(0);
    expect(component.toDo.dueDate.getSeconds()).toEqual(59);
  });
});
