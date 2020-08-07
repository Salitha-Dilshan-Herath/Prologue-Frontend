import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterErrorSnackbarComponent } from './register-error-snackbar.component';

describe('RegisterErrorSnackbarComponent', () => {
  let component: RegisterErrorSnackbarComponent;
  let fixture: ComponentFixture<RegisterErrorSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterErrorSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterErrorSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
