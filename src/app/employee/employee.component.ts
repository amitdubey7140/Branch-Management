import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddOrganisationModel, FilterModel, SetAdmin } from '../shared/model/common.modal';
import { CommonService } from '../shared/service/common.service';
import { EmployeeService } from './employee.service';
import { debounceTime, distinctUntilChanged, exhaustMap, Observable, pluck } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Comman, Roles } from '../shared/utils/enums';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"],
})
export class EmployeeComponent{
  
}
