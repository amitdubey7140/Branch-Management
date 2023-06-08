import { Component, OnInit } from "@angular/core";
import { SetAdmin } from "../shared/model/common.modal";
import { CommonService } from "../shared/service/common.service";
import { HttpStatusCode } from "@angular/common/http";
import { Images } from "../shared/utils/images-enum";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Comman, Gender, Password, Roles } from "../shared/utils/enums";
import { GlobleService } from "../shared/service/globle.service";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  currentUser!: SetAdmin;
  setAdmin!: FormGroup;
  popupAction: string = "";
  public get images() {
    return Images;
  }
  public get gender() {
    return Gender;
  }
  public get Comman() {
    return Comman;
  }
  show: Password = this.password.HIDE;
  showCo: Password = this.password.HIDE;
  public get password() {
    return Password;
  }
  date = moment().format("YYYY-MM-DD");
  constructor(
    private _commonService: CommonService,
    private _fromBuilder: FormBuilder,
    private _globleService: GlobleService,
    private _toast:ToastrService
  ) {
    const user = JSON.parse(localStorage.getItem("currentUser") as string);

    this._commonService.getEmpById(user.id).subscribe((res: any) => {
      if (res["code"] === HttpStatusCode.Ok) this.currentUser = res.payLoad[0];
    });
  }

  ngOnInit(): void {
    this.setAdmin = this._fromBuilder.group(
      {
        empName: ["", [Validators.required, Validators.pattern("[A-z ]+$")]],
        salary: ["", Validators.required],
        mobileNo: [
          "",
          [Validators.required, Validators.pattern("[6-9][0-9]{9}")],
        ],
        dateOfJoin: ["", Validators.required],
        gender: [this.gender.MALE],
        roleType: [this.currentUser?.roleType],
        email: ["", [Validators.required, Validators.email]],
      }
    );
  }

  onlyNumberAlloewd(event: any): boolean {
    if (Number.isNaN(Number(event.key))) {
      return false;
    }
    return true;
  }

  saveAdmin(values: SetAdmin) {
    values.empId = this.currentUser.empId
    this._commonService.updateEmployee(values).subscribe((res:any) => {
      if (res['code'] === HttpStatusCode.Ok) {
        this._toast.success('', res.payLoad)
        this.popupAction = ''
        }
    })
  }
}
