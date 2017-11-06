import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetNewHeaderComponent } from './widget-new-header.component';

describe('WidgetNewHeaderComponent', () => {
  let component: WidgetNewHeaderComponent;
  let fixture: ComponentFixture<WidgetNewHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetNewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetNewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
