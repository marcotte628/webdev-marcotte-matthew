import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerneralDietsComponent } from './gerneral-diets.component';

describe('GerneralDietsComponent', () => {
  let component: GerneralDietsComponent;
  let fixture: ComponentFixture<GerneralDietsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerneralDietsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerneralDietsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
