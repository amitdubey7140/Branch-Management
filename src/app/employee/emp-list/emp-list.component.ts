import { Component, ViewChild } from '@angular/core';
import { FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { pluck, debounceTime, distinctUntilChanged } from 'rxjs';
import { SetAdmin, AddOrganisationModel, FilterModel } from 'src/app/shared/model/common.modal';
import { CommonService } from 'src/app/shared/service/common.service';
import { Roles, Comman } from 'src/app/shared/utils/enums';
import { EmployeeService } from '../employee.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss'],
})
export class EmpListComponent {
  empList!: SetAdmin[];
  totelData = 0;
  pageNo = 0;
  orgList!: AddOrganisationModel[];
  date = moment().format('YYYY-MM-DD');
  fileterForm!: FormGroup;
  selectedAll:{empId:number,empName:string}[] = []
  @ViewChild('searchForm') searchForm!: NgForm;
  public get roles() {
    return Roles;
  }
  public get common() {
    return Comman;
  }
  filterObj: FilterModel = {
    orgId: '',
    fromDate: '',
    toDate: '',
    pageSize: 10,
    offset: 0,
    searchKey: '',
  };
  selectedEmp: {empId:number,empName:string}[] = [];
  constructor(
    private _service: EmployeeService,
    private _commonService: CommonService,
    private _toast: ToastrService,
    private _formBuilder: FormBuilder,
    private _route: Router,
    private _ngxService: NgxUiLoaderService
  ) {}
  ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges?.pipe(
      pluck('searchTerm'),
      debounceTime(1000),
      distinctUntilChanged()
    );
    formValue?.subscribe((res) => {
      this.filterObj.searchKey = res;
      if (res?.length >= 3 || res === '') {
        this.pageNo = 0;
        this.getAllData(this.pageNo);
      }
    });
  }

  ngOnInit(): void {
    this._ngxService.start();
    this.getAllData(this.pageNo);
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    if (currentUser.roleType === this.roles.SUPERADMIN) {
      this._commonService.getOrgList().subscribe((res: any) => {
        this.orgList = res.payLoad;
      });
    }
    this.fileterForm = this._formBuilder.group({
      orgId: [''],
      fromDate: [''],
      toDate: [''],
    });
  }
  onpageChangeApi(event: number) {
    if (event > 0) {
      this.pageNo = event;
    }
    this.getAllData(this.pageNo - 1);
  }
  getAllData(pageNo: number) {
    this.filterObj.offset = pageNo;
    this._commonService
      .getAllEmployees(this.filterObj)
      .subscribe((res: any) => {
        this.empList = res.payLoad.content;
        this.totelData = res.payLoad.totalElements;
        this.selectedAll = this.empList.map(res => { return { empId: res.empId, empName: res.empName } })
        this._ngxService.stop();
      });
  }
  filterData(values: FilterModel) {
    this.filterObj = {
      ...this.filterObj,
      ...values,
    };
    this.pageNo = 0;
    this.getAllData(this.pageNo);
  }

  selectEmp(empData: { empId: number, empName: string }) {
    const matchEmp = this.selectedEmp.findIndex(res => res.empId === empData.empId && res.empName === res.empName)      
    if (matchEmp === -1) {
      this.selectedEmp?.push(empData);
    } else {
      this.selectedEmp?.splice(matchEmp, 1);
    }
  }

  viewEmps() {
    this._service.selectedEmps = this.selectedEmp
    this._route.navigate([ '/employee/view-emps']);
  }
  selectAll() {    
    
    
    if (this.selectedEmp.sort().toString() === this.selectedAll.sort().toString()) {
      this.selectedEmp = []
    } else {
      this.selectedEmp = [...this.selectedAll]
    }
    console.log(this.selectedAll,this.selectedEmp);
    
  }

  selected(empData: SetAdmin) {
    const matchEmp = this.selectedEmp.findIndex(res => res.empId === empData.empId && res.empName === res.empName)
    if (matchEmp === -1) {
      return false
    } else {
      return true
    }
  }
}
