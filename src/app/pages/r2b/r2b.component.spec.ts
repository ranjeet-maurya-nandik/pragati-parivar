import { ComponentFixture, TestBed } from '@angular/core/testing';

import { R2bComponent } from './r2b.component';

describe('R2bComponent', () => {
  let component: R2bComponent;
  let fixture: ComponentFixture<R2bComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [R2bComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(R2bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
