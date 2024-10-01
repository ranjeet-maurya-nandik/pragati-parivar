import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveAskComponent } from './give-ask.component';

describe('GiveAskComponent', () => {
  let component: GiveAskComponent;
  let fixture: ComponentFixture<GiveAskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiveAskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiveAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
