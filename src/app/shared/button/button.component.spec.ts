import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have called updateCSSClass when initializing component', () => {
    spyOn(component, 'updateCSSClass');
    component.ngOnInit();
    expect(component.updateCSSClass).toHaveBeenCalled();
  });

  it('should emit an event if the button is clicked', () => {
    spyOn(component.clicked, 'emit');
    component.whenClicked();
    fixture.detectChanges();
    expect(component.clicked.emit).toHaveBeenCalledTimes(1);
  });

  it('should not emit an event if the button is clicked but disabled', () => {
    spyOn(component.clicked, 'emit');
    component.disabled = true;
    fixture.detectChanges();
    component.whenClicked();
    fixture.detectChanges();
    expect(component.clicked.emit).toHaveBeenCalledTimes(0);
  });

  it('should render a text if one is provided', () => {
    component.text = 'My Button';
    fixture.detectChanges();
    expect(element.innerHTML.trim()).toEqual(component.text);
  });

  it('should have default css class if no one is provided', () => {
    component.updateCSSClass();
    expect(component.cssClassByType).toEqual('default');
  });

  it('should have danger css class if is its provided', () => {
    component.type = 'Danger';
    component.updateCSSClass();
    expect(component.cssClassByType).toEqual('danger');
  });

  it('should have warning css class if its provided', () => {
    component.type = 'Warning';
    component.updateCSSClass();
    expect(component.cssClassByType).toEqual('warning');
  });

  it('should have success css class if its provided', () => {
    component.type = 'Success';
    component.updateCSSClass();
    expect(component.cssClassByType).toEqual('success');
  });
});
