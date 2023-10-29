import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsStorePlacesComponent } from './details-store-places.component';

describe('DetailsStorePlacesComponent', () => {
  let component: DetailsStorePlacesComponent;
  let fixture: ComponentFixture<DetailsStorePlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsStorePlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsStorePlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
