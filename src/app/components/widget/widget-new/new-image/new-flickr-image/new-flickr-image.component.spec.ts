import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFlickrImageComponent } from './new-flickr-image.component';

describe('NewFlickrImageComponent', () => {
  let component: NewFlickrImageComponent;
  let fixture: ComponentFixture<NewFlickrImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFlickrImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFlickrImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
