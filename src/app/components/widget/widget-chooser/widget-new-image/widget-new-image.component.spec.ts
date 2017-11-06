import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetNewImageComponent } from './widget-new-image.component';

describe('WidgetNewImageComponent', () => {
  let component: WidgetNewImageComponent;
  let fixture: ComponentFixture<WidgetNewImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetNewImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetNewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
