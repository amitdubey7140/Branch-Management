import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { ShareModule } from '../shared/share.module';
import { AddOrgComponent } from './add-org/add-org.component';
import { ViewOrgListComponent } from './view-org-list/view-org-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewOrgComponent } from './view-org/view-org.component';



@NgModule({
  declarations: [
    OrganizationComponent,
    AddOrgComponent,
    ViewOrgListComponent,
    ViewOrgComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ShareModule,
    ReactiveFormsModule
  ]
})
export class OrganizationModule { }
