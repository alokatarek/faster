import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaveSideBarComponent } from './nave-side-bar.component';

describe('NaveSideBarComponent', () => {
  let component: NaveSideBarComponent;
  let fixture: ComponentFixture<NaveSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaveSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaveSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
