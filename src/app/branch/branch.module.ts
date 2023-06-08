import { NgModule } from "@angular/core";
import { BranchComponent } from "./branch.component";
import { ShareModule } from "../shared/share.module";
import { BranchRoutingModule } from "./branch-routing.module";
import { ViewBranchListComponent } from './view-branch-list/view-branch-list.component';
import { ViewBranchComponent } from './view-branch/view-branch.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";



@NgModule({
    declarations: [
        BranchComponent,
        ViewBranchListComponent,
        ViewBranchComponent,
        AddBranchComponent,
    ],
    imports: [
        BranchRoutingModule,
        ShareModule,
        ReactiveFormsModule,
        CommonModule,
    ]
})

export class BranchModule{

}