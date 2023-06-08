import { HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobleService } from 'src/app/shared/service/globle.service';
import { Comman, Gender, Password, Roles } from 'src/app/shared/utils/enums';
import { Images } from 'src/app/shared/utils/images-enum';
import { BranchService } from '../branch.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { SetAdmin } from 'src/app/shared/model/common.modal';
import { debounceTime, distinctUntilChanged, map, pluck, switchMap } from 'rxjs';
import { Location } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-view-branch',
  templateUrl: './view-branch.component.html',
  styleUrls: ['./view-branch.component.scss']
})
export class ViewBranchComponent implements OnInit {
  popupAction: string = '';
  addBranch!: FormGroup;
  setManager!: FormGroup;
  id: string | null = '';
  currentBranch: any
  manager: any
  empList!: SetAdmin[];
  currentEmp!: SetAdmin | null
  @ViewChild('searchForm') searchForm!: NgForm
  show: Password = this.password.HIDE
  showCo: Password = this.password.HIDE
  public get password() {
    return Password
  }
  public get images() {
    return Images
  }
  public get Comman() {
    return Comman
  }
  public get roles() {
    return Roles
  }
  public get gender() {
    return Gender
  }

  constructor(private _fromBuilder: FormBuilder, private _globleService: GlobleService, private _activateRoute: ActivatedRoute, private _service: BranchService, private _toast: ToastrService, private _commonService: CommonService,private _location:Location) {

  }
  date =  moment().format('YYYY-MM-DD')
  ngOnInit(): void { 
    this.addBranch = this._fromBuilder.group({
      branchName: ['', Validators.required],
      location: ['', Validators.required]
    })

    this.setManager = this._fromBuilder.group({
      empName: ['', [Validators.required, Validators.pattern('[A-z ]+$') ]],
      salary: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('[6-9][0-9]{9}')]],
      password: ['', [Validators.required, Validators.minLength(8) , Validators.pattern('(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^A-z0-9]).{1,}')]],
      confirmPassword: ['', Validators.required],
      dateOfJoin: ['', Validators.required],
      gender:[this.gender.MALE],
      roleType: [Roles.MANAGER],
      email: ['', [Validators.required, Validators.email]]
    }, { validator: this._globleService.passwordConfirming })


    this.id = this._activateRoute.snapshot.paramMap.get('id')
    this.getData()
  }


  onlyNumberAlloewd(event: any): boolean {
    if (Number.isNaN(Number(event.key))) {
      return false
    }
    return true
  }

  saveAdmin(values: SetAdmin) {
    if (this.currentEmp) {
      values.branch = { branchId: this.currentBranch.branchId }
      values.organisation = { orgId: this.currentBranch.organisation.orgId,orgName:this.currentBranch.organisation.orgName }
      values.empId = this.currentEmp.empId
      this._commonService.updateEmployee(values).subscribe((res: any) => {
        if (res['code'] === HttpStatusCode.Ok) {
          this._toast.success("Manager Updated Sucessfully", 'Success')
          this.setManager.reset()
          this.popupAction = ''
          this.getData()
        }
      })
    } else {
      values.branch = { branchId: this.currentBranch.branchId }
      values.organisation = { orgId: this.currentBranch.organisation.orgId, orgName: this.currentBranch.organisation.orgName }
      delete values['confirmPassword']
      this._commonService.addEmployee(values).subscribe((res: any) => {
        if (res['code'] === HttpStatusCode.Ok) {
          this._toast.success("Manager Added Sucessfully", 'Success')
          this.setManager.reset()
          this.popupAction = ''
          this.getData()
        }
      })
    }
  }

  getData() {
    this._service.getBranchById(this.id).subscribe((res: any) => {
      if (res['code'] === HttpStatusCode.Ok) {
        this.currentBranch = res.payLoad[0]
        this.manager = this.currentBranch.employeeList.find((res: any) => res.roleType === Roles.MANAGER)
        this.empList = this.currentBranch.employeeList.filter((res: any) => res.roleType === Roles.EMPLOYEE)
      }

    })
  }
  setManagerClick(role: Roles, data: SetAdmin | null) {
    this.popupAction = Comman.SET_ADMIN
    this.currentEmp = data
    if (data) {
      this.setManager.patchValue(data)
      this.setManager.removeValidators(this._globleService.passwordConfirming)
      this.setManager.removeControl('password')
      this.setManager.removeControl('confirmPassword')
    } else {
      this.setManager.reset();
      this.setManager.get('gender')?.setValue(this.gender.MALE);
      this.setManager.addControl('password',this._fromBuilder.control('',[Validators.required]))
      this.setManager.addControl('confirmPassword',this._fromBuilder.control(''))
      this.setManager.addValidators(this._globleService.passwordConfirming)
      this.setManager.get('roleType')?.setValue(role)
    }
  }

  deleteEmployees(id: number) {
      this._commonService.deleteEmployee(id).subscribe((res: any) => {
        if (res["code"] === HttpStatusCode.Ok) {
          this._toast.success('', res.message)
          this.getData()
        }
      })
  }
  back() {
    this._location.back()
  }
}
