import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketchartComponent } from './packetchart.component';

describe('PacketchartComponent', () => {
  let component: PacketchartComponent;
  let fixture: ComponentFixture<PacketchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacketchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
