import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BranchComponent } from "./branch.component";
import { ViewBranchListComponent } from "./view-branch-list/view-branch-list.component";
import { AddBranchComponent } from "./add-branch/add-branch.component";
import { ViewBranchComponent } from "./view-branch/view-branch.component";
import { ManagerGuard } from "../guard/manager.guard";

const routes:Routes =[
    {path:'',component:BranchComponent,children:[
       {path:'',component:ViewBranchListComponent,canActivate:[ManagerGuard]}, 
        { path: 'add-branch', component: AddBranchComponent, canActivate: [ManagerGuard]}, 
       {path:'view-branch/:id',component:ViewBranchComponent}, 
        { path: 'update-branch/:id', component: AddBranchComponent, canActivate: [ManagerGuard]} 
    ]}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class BranchRoutingModule{

}
