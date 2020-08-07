import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-error-snackbar',
  templateUrl: './register-error-snackbar.component.html',
  styleUrls: ['./register-error-snackbar.component.css']
})
export class RegisterErrorSnackbarComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message, action: string,durationInSeconds: number) {
      this.snackBar.open(message, action, {
        duration: durationInSeconds *1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });

  }

}
