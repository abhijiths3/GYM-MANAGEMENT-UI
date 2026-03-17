import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietPlannerComponent } from './diet-planner.component';

describe('DietPlannerComponent', () => {
  let component: DietPlannerComponent;
  let fixture: ComponentFixture<DietPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DietPlannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
