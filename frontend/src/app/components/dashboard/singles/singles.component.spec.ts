import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSinglesComponent } from './singles.component';

describe('DashboardSinglesComponent', () => {
  let component: DashboardSinglesComponent;
  let fixture: ComponentFixture<DashboardSinglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSinglesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSinglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
