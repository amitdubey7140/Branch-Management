import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { AddBranchModel, AddOrganisationModel, SetAdmin } from '../shared/model/common.modal';
import { CommonService } from '../shared/service/common.service';
import { Roles } from '../shared/utils/enums';
import { ChartOptions } from './dashboard.modal';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  chartOptions!: ChartOptions;
  orgList!: AddOrganisationModel[];
  branchList!: AddBranchModel[];
  totalEmp: number = 0;
  chartOption2!: ChartOptions;
  chartOptions2!: ChartOptions;
  public get roles() {
    return Roles
  }
  currentUser!:SetAdmin
  constructor(private _commonService: CommonService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
     
  }

  ngOnInit(): void {
    if(this.currentUser.roleType === this.roles.SUPERADMIN){
     this.getAllOrg();
   
    }
    if (this.currentUser.roleType === this.roles.ADMIN || this.currentUser.roleType === this.roles.SUPERADMIN) {
      this.getAllBranch();
    }
    this.getAllEmp();
    this.chartOptions = this.initializeBarChart(
      [0],
      ['orgLable'],
      "Organization Data",
      "Branches"
    );
     this.chartOptions2 = this.initializeBarChart(
       [0],
       ['branchLable'],
       "Branch Data",
       "Employees"
     );
    // This is for ApexCharts Settings
    // this.chartOptions = this.initializeBarChart([0], [""], "Organization Data");
  }

  getAllOrg() {
    this._commonService.getOrgList().subscribe((res: any) => {
      this.orgList = res.payLoad;
      const orgData = this.orgList.map((res) => res.branchList.length);
      const orgLable = this.orgList.map((res) => res.orgName);
      this.chartOptions = this.initializeBarChart(orgData, orgLable,'Organization Data','Branches');
    });
  }

  initializeBarChart(
    data: number[],
    labels: string[],
    titleText: string,
    dataText:string
  ): ChartOptions {
    return {
      series: [
        {
          data: data,
          name: dataText,
        },
      ],
      chart: {
        type: "bar",
        height: "550px",
        toolbar: {
          show: false,
          autoSelected: "pan",
        },
      },
      tooltip: {
        theme: "dark",
      },
      title: {
        text: titleText,
        margin: 10,
        style: {
          fontSize: "32px",
          fontWeight: "bold",
          color: "#fff",
        },
      },
      labels: labels,
      grid: {
        show: true,
        borderColor: "#f2f2f2",
      },
      fill: {
        opacity: 0.9,
        colors: ["#269688"],
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0.3,
          opacityFrom: 0.9,
          opacityTo: 0.9,
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        tickPlacement: "on",
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      yaxis: {
        logBase: 20,
        forceNiceScale: true,
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
    };
  }
  getAllBranch() {
    this._commonService.getAllBranches().subscribe((res: any) => {
      this.branchList = res.payLoad;
      const branchData = this.branchList.map(
        (res) => (res.employeeList as []).length
      );
      const branchLable = this.branchList.map((res) => res.branchName);
      this.chartOptions2 = this.initializeBarChart(branchData, branchLable,'Branch Data','Employees');
    });
  }
  getAllEmp() {
    this._commonService
      .getAllEmployees({
        orgId: "",
        fromDate: "",
        toDate: "",
        pageSize: 10,
        offset: 0,
        searchKey: "",
      })
      .subscribe((res: any) => {
        this.totalEmp = res.payLoad.totalElements;
      });
  }
}
