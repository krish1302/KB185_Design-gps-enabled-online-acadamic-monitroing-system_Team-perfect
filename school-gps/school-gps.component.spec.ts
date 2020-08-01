import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGpsComponent } from './school-gps.component';

describe('SchoolGpsComponent', () => {
  let component: SchoolGpsComponent;
  let fixture: ComponentFixture<SchoolGpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
