import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BReportDetailsComponent } from './b-report-details.component';

describe('BReportDetailsComponent', () => {
  let component: BReportDetailsComponent;
  let fixture: ComponentFixture<BReportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BReportDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
