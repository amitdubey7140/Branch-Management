import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SetAdmin } from 'src/app/shared/model/common.modal';
import { EmployeeService } from '../employee.service';
import { Location } from '@angular/common';
import { GlobleService } from 'src/app/shared/service/globle.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { Images } from 'src/app/shared/utils/images-enum';
import { Gender } from 'src/app/shared/utils/enums';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.scss']
})
export class ViewEmployeesComponent implements OnInit{
  selectedEmps:{empId:number,empName:string}[] = []
  selectedEmp!: SetAdmin
  public get images() {
    return Images
  }
  public get gender() {
    return Gender
  }
constructor(private _commonService:CommonService,private _service:EmployeeService,private _location:Location){}
  ngOnInit(): void {
     if (this._service.selectedEmps.length === 0) {
      this._location.back()
     } else {
           this.selectedEmps = this._service.selectedEmps
            this.getEmpData(this.selectedEmps[0].empId)
    }


   
  }

  getEmpData(empId: number) {
     this._commonService.getEmpById(empId).subscribe((res:any) => {
      this.selectedEmp = res.payLoad[0]
    })

  }
   back() {
    this._location.back()
  }
}
