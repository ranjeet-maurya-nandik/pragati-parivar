import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceReportComponent } from './reference-report.component';

describe('ReferenceReportComponent', () => {
  let component: ReferenceReportComponent;
  let fixture: ComponentFixture<ReferenceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
