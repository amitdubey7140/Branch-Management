import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginDto } from '../auth.modal';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpStatusCode } from '@angular/common/http';
import { Password } from 'src/app/shared/utils/enums';

@Component({
  selector: 'app-login',
  template:`<div>
  <div class="login-icon">
   <i class="fa-solid fa-user-gear"></i>
  </div>
  <form  [formGroup]="loginForm" (ngSubmit)="loginSubmit(loginForm.value)">
   <div class="mb-3 input-field">
       <div class="input-group">
           <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-envelope"></i></span>
           <input  type="text" class="form-control" placeholder="Email" formControlName="email">
       </div>
       <span *ngIf="loginForm.get('email')?.errors?.['required'] && loginForm.get('email')?.touched"><small>Field is required</small></span>
       <span *ngIf="loginForm.get('email')?.errors?.['email'] && loginForm.get('email')?.touched"><small>Please Enter Valid Email</small></span>
   </div>
   <div class="input-field ">
       <div class="input-group position-relative">
           <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-key"></i></span>
           <input [type]="show === password.SHOW?'text':'password'" class="form-control z-0" placeholder="Password" formControlName="password">
           <button (click)="show === password.SHOW?show=password.HIDE:show=password.SHOW" class="btn text-white btn-show position-absolute end-0" type="button">
              <i *ngIf="show===password.SHOW" class="fa-sharp fa-solid fa-eye-slash"></i>
              <i *ngIf="show===password.HIDE" class="fa-solid fa-eye"></i>
           </button>
       </div>
       <span *ngIf="loginForm.get('password')?.errors?.['required'] && loginForm.get('password')?.touched"><small>Field is required</small></span>
       <span *ngIf="loginForm.get('password')?.errors?.['pattern'] && loginForm.get('password')?.touched"><small>Field is required</small></span>
   </div>
   
   <div class="text-center">
       <button class="btn btn-login" [disabled]="loginForm.invalid">
           Login
       </button>
   </div>
  <div class="text-center">
     <a class="mt-3 px-0  text-secondary btn btn-link" routerLink="forgot-password">Forgot Password ?</a>
  </div>
  </form>
</div>`,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  show:Password = this.password.HIDE
  public get password(){
    return Password
  }
  constructor(private _formBuilder:FormBuilder,private _service:AuthService,private _route:Router,private _toast:ToastrService){}
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  // This is for login we are sending request for login 
  loginSubmit(values:loginDto){
    this._service.login(values).subscribe((res:any)=>{
      // console.log(res);
      if(res["code"] === HttpStatusCode.Ok){
        localStorage.setItem('currentUser',JSON.stringify(res.payLoad))
        this._toast.success('Login Successfull','Success')
        this._route.navigateByUrl('dashboard')
      }
    }, (error) =>{
      // console.log(error);
    })
  }

}
