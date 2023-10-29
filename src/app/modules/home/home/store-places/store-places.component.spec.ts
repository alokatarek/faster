import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePlacesComponent } from './store-places.component';

describe('StorePlacesComponent', () => {
  let component: StorePlacesComponent;
  let fixture: ComponentFixture<StorePlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorePlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
