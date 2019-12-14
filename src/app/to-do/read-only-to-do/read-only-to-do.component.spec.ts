import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyToDoComponent } from './read-only-to-do.component';
import { MockComponent } from 'ng-mocks';
import { ButtonComponent } from 'src/app/shared/button/button.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
