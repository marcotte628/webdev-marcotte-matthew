import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiedDietsComponent } from './certified-diets.component';

describe('CertifiedDietsComponent', () => {
  let component: CertifiedDietsComponent;
  let fixture: ComponentFixture<CertifiedDietsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifiedDietsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifiedDietsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
