import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CommonService } from '../shared/service/common.service';
import { SetAdmin } from '../shared/model/common.modal';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
 
  constructor(private _toast: ToastrService, private _route: Router, private _commonService: CommonService) {
   
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
    switch (currentUser.roleType) {
      case 'SUPERADMIN':
        // this._route.navigateByUrl('/organization/view-org/' + this.authUser.organisation.orgId)
        return true
        case 'ADMIN':
        this._route.navigateByUrl('/organization/view-org/' + currentUser.organisationId)
          return false
        case 'MANAGER':
        this._route.navigateByUrl('/branch/view-branch/' + currentUser.branchId)
          return false
        default:
          return false
          
      }
  }
  
}
