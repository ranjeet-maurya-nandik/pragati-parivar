import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R2bReportSummeryComponent } from './r2b-report-summery.component';

describe('R2bReportSummeryComponent', () => {
  let component: R2bReportSummeryComponent;
  let fixture: ComponentFixture<R2bReportSummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R2bReportSummeryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R2bReportSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
