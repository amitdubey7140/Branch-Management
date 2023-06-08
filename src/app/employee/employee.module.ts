import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { ShareModule } from '../shared/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { EmpListComponent } from './emp-list/emp-list.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [EmployeeComponent, EmpListComponent, ViewEmployeesComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TabsModule.forRoot(),
  ],
})
export class EmployeeModule {}
