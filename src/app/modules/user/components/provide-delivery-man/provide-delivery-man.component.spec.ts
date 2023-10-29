import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideDeliveryManComponent } from './provide-delivery-man.component';

describe('ProvideDeliveryManComponent', () => {
  let component: ProvideDeliveryManComponent;
  let fixture: ComponentFixture<ProvideDeliveryManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvideDeliveryManComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvideDeliveryManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
