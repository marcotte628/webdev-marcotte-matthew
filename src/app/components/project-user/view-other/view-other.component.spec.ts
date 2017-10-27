import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOtherComponent } from './view-other.component';

describe('ViewOtherComponent', () => {
  let component: ViewOtherComponent;
  let fixture: ComponentFixture<ViewOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
