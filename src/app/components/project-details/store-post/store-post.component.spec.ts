import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePostComponent } from './store-post.component';

describe('StorePostComponent', () => {
  let component: StorePostComponent;
  let fixture: ComponentFixture<StorePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
