import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceExchangedComponent } from './reference-exchanged.component';

describe('ReferenceExchangedComponent', () => {
  let component: ReferenceExchangedComponent;
  let fixture: ComponentFixture<ReferenceExchangedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceExchangedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceExchangedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
