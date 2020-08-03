import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTraceComponent } from './school-trace.component';

describe('SchoolTraceComponent', () => {
  let component: SchoolTraceComponent;
  let fixture: ComponentFixture<SchoolTraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolTraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
