import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymPostComponent } from './gym-post.component';

describe('GymPostComponent', () => {
  let component: GymPostComponent;
  let fixture: ComponentFixture<GymPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
