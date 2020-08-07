import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../auth-service.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email:string = "";
  password:string = "";

  constructor(private authService: AuthServiceService,private router:Router, private toastr: ToastrService,private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
  }

  onLoginClick(){

    if (this.email && this.password) {

      this.spinner.show();

      this.authService.login(this.email,this.password).subscribe((res:HttpResponse<any>)=>{

        this.spinner.hide();

        if (res.status===200){

          this.router.navigate(['/main']);
          this.toastr.success('Login scuessful', 'Done');

        }else {
          this.toastr.error('Unable to process your request', 'Error');
        }

      },
      (err:any)=>{

        this.spinner.hide();
        console.log(err.error);
        this.toastr.error('Invalid username or password', 'Error');
        

      })

    }else {

      this.toastr.warning('Please enter username and password', 'Required');

    }
  }
}
