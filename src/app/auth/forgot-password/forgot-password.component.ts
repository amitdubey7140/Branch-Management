import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Password } from 'src/app/shared/utils/enums';
import { Authencate, loginDto, NewPassword } from '../auth.modal';
import { AuthService } from '../auth.service';
import { GlobleService } from 'src/app/shared/service/globle.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  authForm!: FormGroup
  passwordForm!:FormGroup
  show: Password = this.password.HIDE
  coShow:Password = this.password.HIDE
  stap=1
  public get password() {
    return Password
  }
  constructor(private _formBuilder: FormBuilder, private _service: AuthService, private _route: Router, private _toast: ToastrService, private _globalService: GlobleService) { }
  ngOnInit(): void {
    this.authForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })

    this.passwordForm = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^A-z0-9]).{1,}')]],
      confirmPassword:['',Validators.required]
    }, { validator: this._globalService.passwordConfirming })

  }

  // This is for login we are sending request for login 
  authSubmit(values: Authencate) {
    this._service.authenticate(values).subscribe((res:any) => {
      if (res['code'] === HttpStatusCode.Ok) {
        this.stap = 2
      }
    })
  } 

  passwordFormSubmit(values: { password: string, confirmPassword :string}) {
    
    this._service.changePassword({newPassword:values.password,email:this.authForm.value.email}).subscribe((res:any) => {
      if (res['code'] === HttpStatusCode.Ok) {
        this._toast.success('', res.payLoad)
        this._route.navigateByUrl('')
      }
    })
  }

  onlyNumberAlloewd(event: any): boolean {
    if (Number.isNaN(Number(event.key))) {
      return false
    }
    return true
  }
}
