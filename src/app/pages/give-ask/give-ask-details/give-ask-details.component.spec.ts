import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveAskDetailsComponent } from './give-ask-details.component';

describe('GiveAskDetailsComponent', () => {
  let component: GiveAskDetailsComponent;
  let fixture: ComponentFixture<GiveAskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiveAskDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiveAskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
