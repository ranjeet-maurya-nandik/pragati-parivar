import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R2bReportComponent } from './r2b-report.component';

describe('R2bReportComponent', () => {
  let component: R2bReportComponent;
  let fixture: ComponentFixture<R2bReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R2bReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R2bReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
