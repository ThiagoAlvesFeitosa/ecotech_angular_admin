import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardForm } from './reward-form';

describe('RewardForm', () => {
  let component: RewardForm;
  let fixture: ComponentFixture<RewardForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
