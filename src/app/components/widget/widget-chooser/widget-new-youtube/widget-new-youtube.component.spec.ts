import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetNewYoutubeComponent } from './widget-new-youtube.component';

describe('WidgetNewYoutubeComponent', () => {
  let component: WidgetNewYoutubeComponent;
  let fixture: ComponentFixture<WidgetNewYoutubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetNewYoutubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetNewYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
