import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddBranchModel } from 'src/app/shared/model/common.modal';
import { CommonService } from 'src/app/shared/service/common.service';
import { Images } from 'src/app/shared/utils/images-enum';
import { BranchService } from '../branch.service';

@Component({
  selector: 'app-view-branch-list',
  templateUrl: './view-branch-list.component.html',
  styleUrls: ['./view-branch-list.component.scss']
})
export class ViewBranchListComponent {
  id = 1
  branchList: AddBranchModel[] = []
  public get images() {
    return Images
  }
  constructor(private _service: BranchService, private _toast: ToastrService, private _commonService: CommonService) { }
  ngOnInit(): void {
    this.getBranchList()
  }


  getBranchList() {
    this._commonService.getAllBranches().subscribe((res: any) => {
      // console.log(res);
      if (res["code"] === HttpStatusCode.Ok) {
        this.branchList = res["payLoad"];
      }
    });
  }

  deleteBranch(id: number) {
    
      this._commonService.deleteBranch(id).subscribe((res: any) => {
        if (res["code"] === HttpStatusCode.Ok) {
          this._toast.success('', res.message)
          this.getBranchList()
        }
      })
  }

}
