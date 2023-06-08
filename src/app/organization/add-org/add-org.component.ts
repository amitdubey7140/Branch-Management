import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgService } from '../organization.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { AddOrganisationModel } from 'src/app/shared/model/common.modal';

@Component({
  selector: 'app-add-org',
  templateUrl: './add-org.component.html',
  styleUrls: ['./add-org.component.scss']
})
export class AddOrgComponent implements OnInit {
  addOrgForm!: FormGroup;
  orgId: string | null = null
  orgData!: AddOrganisationModel

  constructor(private _formBilder: FormBuilder, private _service: OrgService, private _toast: ToastrService, private _route: Router, private _activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.addOrgForm = this._formBilder.group({
      orgName: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
    // Hare we are get the ID form quiry parems  
    this.orgId = this._activeRoute.snapshot.paramMap.get('id')
    if (this.orgId) {
      this.getOrgData(this.orgId)
    }
  }

  // Hare we are saving the Organization details 
  saveOrg(values: AddOrganisationModel) {
    if (this.orgId) {
      values.orgId = this.orgData.orgId
      this._service.updateOrgData(values).subscribe((res: any) => {
        if (res['code'] === HttpStatusCode.Ok) {
          this._toast.success('Organization Updated Successfully', 'Success')
          this._route.navigateByUrl('/organization')
        }
      })
    } else {
      this._service.addOrg(values).subscribe((res: any) => {
        if (res['code'] === HttpStatusCode.Ok) {
          this._toast.success('Organization Saved Successfully', 'Success')
          this._route.navigateByUrl('/organization')
        }
      })
    }
  }

  getOrgData(id: string | null) {
    this._service.getOrgById(id).subscribe((res: any) => {
      this.orgData = res.payLoad
      this.addOrgForm.patchValue(this.orgData)
    })
  }
}
