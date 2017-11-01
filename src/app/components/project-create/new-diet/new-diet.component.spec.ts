import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDietComponent } from './new-diet.component';

describe('NewDietComponent', () => {
  let component: NewDietComponent;
  let fixture: ComponentFixture<NewDietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
