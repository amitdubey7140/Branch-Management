import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpListComponent } from './emp-list/emp-list.component';
import { EmployeeComponent } from './employee.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';

const routes: Routes = [{
  path: '', component: EmployeeComponent, children: [
    { path: '', component: EmpListComponent },
    {path:'view-emps',component:ViewEmployeesComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
