import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiedWorkoutsComponent } from './certified-workouts.component';

describe('CertifiedWorkoutsComponent', () => {
  let component: CertifiedWorkoutsComponent;
  let fixture: ComponentFixture<CertifiedWorkoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifiedWorkoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifiedWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
