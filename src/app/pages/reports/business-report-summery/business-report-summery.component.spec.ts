import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessReportSummeryComponent } from './business-report-summery.component';

describe('BusinessReportSummeryComponent', () => {
  let component: BusinessReportSummeryComponent;
  let fixture: ComponentFixture<BusinessReportSummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessReportSummeryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessReportSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
