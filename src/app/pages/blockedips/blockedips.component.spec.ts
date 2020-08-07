import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedipsComponent } from './blockedips.component';

describe('BlockedipsComponent', () => {
  let component: BlockedipsComponent;
  let fixture: ComponentFixture<BlockedipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
