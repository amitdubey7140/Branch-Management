import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { AddOrganisationModel, AddBranchModel } from "../shared/model/common.modal";


@Injectable({
    providedIn:"root"
})
export class OrgService{
    baseUrl = environment.baseUrl
    constructor(private _http:HttpClient){}

    addOrg(requestPayload:AddOrganisationModel):Observable<AddOrganisationModel>{
        return this._http.post<AddOrganisationModel>(this.baseUrl+'api/v1/organisation/save-organisation',requestPayload)
    }

    getOrgById(id:string|null):Observable<AddOrganisationModel>{
        return this._http.get<AddOrganisationModel>(this.baseUrl+'api/v1/organisation/get-by-organisationId/'+id)   
    }
    saveBranch(requestPayload:AddBranchModel):Observable<AddBranchModel>{
        return this._http.post<AddBranchModel>(this.baseUrl+'api/v1/branch/save-branch',requestPayload)
    }
    updateOrgData(requestPayload:AddOrganisationModel):Observable<AddOrganisationModel>{
        return this._http.put<AddOrganisationModel>(this.baseUrl+'api/v1/organisation/update-organisation',requestPayload)
    }
    deleteOrg(id:number):Observable<any>{
        return this._http.delete(this.baseUrl+'api/v1/organisation/delete-organisation/'+id)
    }
    
}