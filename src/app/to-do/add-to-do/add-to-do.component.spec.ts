import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToDoComponent } from './add-to-do.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { element } from 'protractor';
import { By } from '@angular/platform-browser';

describe('AddToDoComponent', () => {
  let component: AddToDoComponent;
  let fixture: ComponentFixture<AddToDoComponent>;
  let myButton: HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        AddToDoComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToDoComponent);
    component = fixture.componentInstance;
    myButton = fixture.debugElement.query(By.css('my-button')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a description "New ToDo" and a dueDate', () => {
    expect(component.description).toEqual('New ToDo');
    expect(component.dueDate).toBeDefined();
    expect(component.dueDate.getHours()).toBe(23);
    expect(component.dueDate.getMinutes()).toBe(59);
    expect(component.dueDate.getSeconds()).toBe(59);
    expect(component.dueDate.getDate()).toBe(new Date().getDate() + 1);
  })

  it('should emit a new To-Do when button is clicked', () => {
    spyOn(component, 'addToDo');
    myButton.click();
    expect(component.addToDo).toHaveBeenCalledTimes(1);
  });

  it('should emit a new To-Do after generated it', () => {
    const newToDo = component.generateToDo();
    spyOn(component, 'generateToDo').and.returnValue(newToDo);
    spyOn(component.createToDo, 'emit');
    myButton.click();
    expect(component.generateToDo).toHaveBeenCalledTimes(1);
    expect(component.createToDo.emit).toHaveBeenCalledWith(newToDo);
  });

  it('should call init method after a new To-Do is created', () => {
    spyOn(component, 'init');
    component.addToDo();
    expect(component.init).toHaveBeenCalledTimes(1);
  });

  it ('should be able to update the To-Do description via template', () => {
    let myInput = fixture.debugElement.query(By.css('.todo-desc')).nativeElement;
    expect(myInput.value).toBe(component.description);
    myInput.value = 'New Task';
    myInput.dispatchEvent(new Event('change'));
    expect(component.description).toEqual('New Task');
  });

  it ('should be able to update the To-Do dueDate via template', () => {
    let myInput = fixture.debugElement.query(By.css('.todo-date')).nativeElement;
    expect(new Date(myInput.value).getDay()).toBe(component.dueDate.getDay());
    expect(new Date(myInput.value).getMonth()).toBe(component.dueDate.getMonth());
    expect(new Date(myInput.value).getFullYear()).toBe(component.dueDate.getFullYear());
    myInput.value = '2019-01-01';
    myInput.dispatchEvent(new Event('change'));
    const newDate = new Date(myInput.value);
    expect(component.dueDate.getDate()).toBe(newDate.getDate());
  });

  it ('should be able to update the To-Do dueDate time via template', () => {
    let myInput = fixture.debugElement.query(By.css('.todo-time')).nativeElement;
    const newTime = new Date();
    newTime.setHours(myInput.value.split(':')[0]);
    newTime.setMinutes(myInput.value.split(':')[1]);
    expect(newTime.getHours()).toBe(component.dueDate.getHours());
    expect(newTime.getMinutes()).toBe(component.dueDate.getMinutes());
    myInput.value = '22:00';
    myInput.dispatchEvent(new Event('change'));
    expect(component.dueDate.getHours()).toEqual(22);
    expect(component.dueDate.getMinutes()).toEqual(0);
    expect(component.dueDate.getSeconds()).toEqual(59);
  });
});
