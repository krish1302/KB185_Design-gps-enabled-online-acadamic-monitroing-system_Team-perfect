import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsUserComponent } from './gps-user.component';

describe('GpsUserComponent', () => {
  let component: GpsUserComponent;
  let fixture: ComponentFixture<GpsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
