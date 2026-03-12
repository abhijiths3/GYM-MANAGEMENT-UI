import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponManagerComponent } from './coupon-manager.component';

describe('CouponManagerComponent', () => {
  let component: CouponManagerComponent;
  let fixture: ComponentFixture<CouponManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
