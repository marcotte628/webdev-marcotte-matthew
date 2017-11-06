import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetNewHtmlComponent } from './widget-new-html.component';

describe('WidgetNewHtmlComponent', () => {
  let component: WidgetNewHtmlComponent;
  let fixture: ComponentFixture<WidgetNewHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetNewHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetNewHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
