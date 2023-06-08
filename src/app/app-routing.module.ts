import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guard/auth.guard";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { DashboardGuard } from "./guard/dashboard.guard";
import { EmployeeGuard } from "./guard/employee.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
    canActivate: [AuthGuard,DashboardGuard],
  },
  {
    path: "branch",
    loadChildren: () =>
      import("./branch/branch.module").then((m) => m.BranchModule),
    canActivate: [AuthGuard],
  },
  {
    path: "organization",
    loadChildren: () =>
      import("./organization/organization.module").then(
        (m) => m.OrganizationModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "employee",
    loadChildren: () =>
      import("./employee/employee.module").then((m) => m.EmployeeModule),
    canActivate:[EmployeeGuard]
  },

  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
