import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessReportComponent } from './business-report.component';

describe('BusinessReportComponent', () => {
  let component: BusinessReportComponent;
  let fixture: ComponentFixture<BusinessReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
