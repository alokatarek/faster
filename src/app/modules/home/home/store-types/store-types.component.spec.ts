import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTypesComponent } from './store-types.component';

describe('StoreTypesComponent', () => {
  let component: StoreTypesComponent;
  let fixture: ComponentFixture<StoreTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
