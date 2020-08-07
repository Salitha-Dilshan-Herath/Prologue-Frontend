import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSuccesfulSnackbarComponent } from './register-succesful-snackbar.component';

describe('RegisterSuccesfulSnackbarComponent', () => {
  let component: RegisterSuccesfulSnackbarComponent;
  let fixture: ComponentFixture<RegisterSuccesfulSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSuccesfulSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSuccesfulSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
