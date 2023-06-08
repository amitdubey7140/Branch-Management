import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from './organization.component';
import { ViewOrgListComponent } from './view-org-list/view-org-list.component';
import { AddOrgComponent } from './add-org/add-org.component';
import { ViewOrgComponent } from './view-org/view-org.component';
import { AdminGuard } from '../guard/admin.guard';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [{ path: '', component: OrganizationComponent,children:[
  {path:'',component:ViewOrgListComponent,canActivate:[AdminGuard]},
  { path: 'add-org', component: AddOrgComponent, canActivate: [AdminGuard] },
  {path:'view-org/:id',component:ViewOrgComponent},
  { path: 'update-org/:id', component: AddOrgComponent, canActivate: [AdminGuard] }
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
