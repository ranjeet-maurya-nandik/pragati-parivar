import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R2bDetailsComponent } from './r2b-details.component';

describe('R2bDetailsComponent', () => {
  let component: R2bDetailsComponent;
  let fixture: ComponentFixture<R2bDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R2bDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R2bDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
