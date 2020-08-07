import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterSuccesfulSnackbarComponent } from './register-succesful-snackbar/register-succesful-snackbar.component';
import { RegisterErrorSnackbarComponent } from './register-error-snackbar/register-error-snackbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  durationInSeconds = 5;
  constructor(private authService: AuthServiceService,private _snackBar: MatSnackBar,public snackbar:RegisterErrorSnackbarComponent,private router:Router) { }
  email:string = "";
  password:string = "";

  ngOnInit(): void {
  }

  onRegisterClick(){
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (this.email != "" && (this.email.length <= 5 || !EMAIL_REGEXP.test(this.email))) {
        this.snackbar.openSnackBar('Invalid Email Address', 'Close',this.durationInSeconds); 
        return;
    }
    else if(this.password.length<8){
        this.snackbar.openSnackBar('Password should contain more than 8 characters', 'Close',this.durationInSeconds); 
        return;
    }
    else{
      this.authService.register(this.email,this.password).subscribe((res:HttpResponse<any>)=>{
        if (res.status===200){
          this._snackBar.openFromComponent(RegisterSuccesfulSnackbarComponent, {
            duration: this.durationInSeconds * 1000,
          });
          this.router.navigate(['/login']);
        }
      },
      (err:any)=>{
        if(err.error.code==11000){
          this.snackbar.openSnackBar('The Email Address Alreay Exist', 'Close',this.durationInSeconds); 
          return;
        }
        else{
          this._snackBar.openFromComponent(RegisterErrorSnackbarComponent, {
            duration: this.durationInSeconds * 1000,
          });
        }
      })
    }
  }
  
}
