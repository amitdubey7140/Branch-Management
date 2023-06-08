import { Component, OnInit } from '@angular/core';
import { OrgService } from '../organization.service';
import { ToastrService } from 'ngx-toastr';
import { HttpStatusCode } from '@angular/common/http';
import { Images } from 'src/app/shared/utils/images-enum';
import { AddOrganisationModel } from 'src/app/shared/model/common.modal';
import { CommonService } from 'src/app/shared/service/common.service';


@Component({
  selector: 'app-view-org',
  templateUrl: './view-org-list.component.html',
  styleUrls: ['./view-org-list.component.scss']
})
export class ViewOrgListComponent implements OnInit {
  id = 1
  orgList: AddOrganisationModel[] = []
  public get images() {
    return Images
  }
  constructor(private _service: OrgService, private _toast: ToastrService,private _commonService:CommonService) { }
  ngOnInit(): void {
    this.getOrgList()
  }


  getOrgList() {
    this._commonService.getOrgList().subscribe((res: any) => {
      // console.log(res);
      if (res["code"] === HttpStatusCode.Ok) {
        this.orgList = res['payLoad']
      }
    })
  }

  deleteOrg(id: number) {
 
      this._service.deleteOrg(id).subscribe((res: any) => {
        if (res["code"] === HttpStatusCode.Ok) {
          this._toast.success('', res.message)
          this.getOrgList()
        }
      })
  }

}
