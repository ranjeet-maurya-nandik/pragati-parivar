import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessReportingComponent } from './business-reporting.component';

describe('BusinessReportingComponent', () => {
  let component: BusinessReportingComponent;
  let fixture: ComponentFixture<BusinessReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessReportingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
