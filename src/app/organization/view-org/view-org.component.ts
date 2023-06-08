import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobleService } from 'src/app/shared/service/globle.service';
import { Comman, Gender, Password, Roles } from 'src/app/shared/utils/enums';
import { OrgService } from '../organization.service';
import { ToastrService } from 'ngx-toastr';
import { HttpStatusCode } from '@angular/common/http';
import { Images } from 'src/app/shared/utils/images-enum';
import { CommonService } from 'src/app/shared/service/common.service';
import { AddBranchModel, SetAdmin } from 'src/app/shared/model/common.modal';
import * as moment from 'moment';

@Component({
  selector: "app-view-org",
  templateUrl: "./view-org.component.html",
  styleUrls: ["./view-org.component.scss"],
})
export class ViewOrgComponent implements OnInit {
  popupAction: string = "";
  addBranch!: FormGroup;
  setAdmin!: FormGroup;
  id: string | null = "";
  currentOrg: any;
  admin: any;
  currentBranch!: AddBranchModel;
  show: Password = this.password.HIDE;
  showCo: Password = this.password.HIDE;
  public get password() {
    return Password;
  }
  public get images() {
    return Images;
  }
  public get Comman() {
    return Comman;
  }
  public get gender() {
    return Gender;
  }
  date = moment().format("YYYY-MM-DD");
  constructor(
    private _fromBuilder: FormBuilder,
    private _globleService: GlobleService,
    private _activateRoute: ActivatedRoute,
    private _service: OrgService,
    private _toast: ToastrService,
    private _commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.addBranch = this._fromBuilder.group({
      branchName: ["", Validators.required],
      location: ["", Validators.required],
    });

    this.setAdmin = this._fromBuilder.group(
      {
        empName: ["", [Validators.required, Validators.pattern("[A-z ]+$")]],
        salary: ["", Validators.required],
        mobileNo: [
          "",
          [Validators.required, Validators.pattern("[6-9][0-9]{9}")],
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern("(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^A-z0-9]).{1,}"),
          ],
        ],
        confirmPassword: ["", Validators.required],
        dateOfJoin: ["", Validators.required],
        gender: [this.gender.MALE],
        roleType: [Roles.ADMIN],
        email: ["", [Validators.required, Validators.email]],
      },
      { validator: this._globleService.passwordConfirming }
    );

    this.id = this._activateRoute.snapshot.paramMap.get("id");
    this.getData();
  }

  onlyNumberAlloewd(event: any): boolean {
    if (Number.isNaN(Number(event.key))) {
      return false;
    }
    return true;
  }

  saveBranch(values: AddBranchModel) {
    if (this.currentBranch) {
      values.organisation = {
        orgId: this.currentOrg.orgId,
        orgName: this.currentOrg.orgName,
      };
      values.branchId = this.currentBranch.branchId;
      this._commonService.updateBranch(values).subscribe((res: any) => {
        if (res["code"] === HttpStatusCode.Ok) {
          this._toast.success(res.message, "Success");
          this.popupAction = "";
          this.addBranch.reset();
          this.getData();
        }
      });
    } else {
      values.organisation = {
        orgId: this.currentOrg.orgId,
        orgName: this.currentOrg.orgName,
      };
      console.log(values);
      this._service.saveBranch(values).subscribe((res: any) => {
        if (res["code"] === HttpStatusCode.Ok) {
          this._toast.success(res.message, "Success");
          this.popupAction = "";
          this.addBranch.reset();
          this.getData();
        }
      });
    }
  }

  saveAdmin(values: SetAdmin) {
    if (this.admin) {
      values.organisation = {
        orgId: this.currentOrg.orgId,
        orgName: this.currentOrg.orgName,
      };
      values.empId = this.admin.empId;
      this._commonService.updateEmployee(values).subscribe((res: any) => {
        if (res["code"] === HttpStatusCode.Ok) {
          this._toast.success("Admin Updated Sucessfully", "Success");
          this.setAdmin.reset();
          this.popupAction = "";
          this.getData();
        }
      });
    } else {
      values.organisation = {
        orgId: this.currentOrg.orgId,
        orgName: this.currentOrg.orgName,
      };
      delete values["confirmPassword"];
      this._commonService.addEmployee(values).subscribe((res: any) => {
        if (res["code"] === HttpStatusCode.Ok) {
          this._toast.success("Admin Added Sucessfully", "Success");
          this.setAdmin.reset();
          this.popupAction = "";
          this.getData();
        }
      });
    }
  }

  getData() {
    this._service.getOrgById(this.id).subscribe((res: any) => {
      this.currentOrg = res.payLoad;
      this.admin = this.currentOrg.employees.find(
        (res: any) => res.roleType === Roles.ADMIN
      );
    });
  }
  setAdminClick() {
    this.popupAction = Comman.SET_ADMIN;
    if (this.admin) {
      this.setAdmin.patchValue(this.admin);
      this.setAdmin.removeValidators(this._globleService.passwordConfirming);
      this.setAdmin.removeControl("password");
      this.setAdmin.removeControl("confirmPassword");
    } else {
      this.setAdmin.addControl(
        "password",
        this._fromBuilder.control("", [Validators.required])
      );
      this.setAdmin.addControl(
        "confirmPassword",
        this._fromBuilder.control("")
      );
      this.setAdmin.addValidators(this._globleService.passwordConfirming);
      this.setAdmin.get("roleType")?.setValue(Roles.ADMIN);
    }
  }

  editBrnch(branch: AddBranchModel) {
    this.popupAction = Comman.ADD_BRANCH;
    this.addBranch.patchValue(branch);
    this.currentBranch = branch;
  }
  deleteBranch(id: number) {
  
      this._commonService.deleteBranch(id).subscribe((res: any) => {
        if (res["code"] === HttpStatusCode.Ok) {
          this._toast.success("", res.message);
          this.getData();
        }
      });
  }
}
