import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsList } from './rewards-list';

describe('RewardsList', () => {
  let component: RewardsList;
  let fixture: ComponentFixture<RewardsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
