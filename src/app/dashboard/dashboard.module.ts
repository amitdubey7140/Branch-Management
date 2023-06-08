import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


import { NgApexchartsModule } from 'ng-apexcharts';
import { ShareModule } from "../shared/share.module";



@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgApexchartsModule,
        ShareModule
    ]
})
export class DashboardModule { }
