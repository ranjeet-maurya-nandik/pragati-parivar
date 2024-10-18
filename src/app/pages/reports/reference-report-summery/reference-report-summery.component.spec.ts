import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceReportSummeryComponent } from './reference-report-summery.component';

describe('ReferenceReportSummeryComponent', () => {
  let component: ReferenceReportSummeryComponent;
  let fixture: ComponentFixture<ReferenceReportSummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceReportSummeryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceReportSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
