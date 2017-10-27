import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietPostComponent } from './diet-post.component';

describe('DietPostComponent', () => {
  let component: DietPostComponent;
  let fixture: ComponentFixture<DietPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
