import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralWorkoutsComponent } from './general-workouts.component';

describe('GeneralWorkoutsComponent', () => {
  let component: GeneralWorkoutsComponent;
  let fixture: ComponentFixture<GeneralWorkoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralWorkoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
