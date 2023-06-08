import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddBranchModel } from 'src/app/shared/model/common.modal';
import { CommonService } from 'src/app/shared/service/common.service';
import { BranchService } from '../branch.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent {
  addBranchForm!: FormGroup;
  branchId: string | null = null
  branchData!: AddBranchModel

  constructor(private _formBilder: FormBuilder, private _service: BranchService, private _toast: ToastrService, private _route: Router, private _activeRoute: ActivatedRoute, private _commonService: CommonService) { }
  ngOnInit(): void {
    this.addBranchForm = this._formBilder.group({
      branchName: ['', [Validators.required]],
      location: ['', [Validators.required]],
    })
    // Hare we are get the ID form quiry parems  
    this.branchId = this._activeRoute.snapshot.paramMap.get('id')
    if (this.branchId) {
      this.getBranchData(this.branchId)
    }
  }

  // Hare we are saving the Organization details 
  saveBranch(values: AddBranchModel) {
    if (this.branchId) {
      values.branchId = this.branchData.branchId
      values.organisation = { orgId: this.branchData.organisation.orgId, orgName: this.branchData.organisation.orgName }
      this._commonService.updateBranch(values).subscribe((res: any) => {
        if (res['code'] === HttpStatusCode.Ok) {
          this._toast.success('Organization Updated Successfully', 'Success')
          this._route.navigateByUrl('/branch')
        }
      })
    }
  }

  getBranchData(id: string | null) {
    this._service.getBranchById(id).subscribe((res: any) => {
      console.log(res);

      this.branchData = res.payLoad[0]
      this.addBranchForm.patchValue(this.branchData)
    })
  }
}
