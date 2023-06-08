import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { AddBranchModel } from "../shared/model/common.modal";


@Injectable({
    providedIn:'root'
})

export class BranchService{
    baseUrl = environment.baseUrl
    constructor(private _http:HttpClient){}
  

    getBranchById(id:string | null):Observable<AddBranchModel>{
       return this._http.get<AddBranchModel>(this.baseUrl+'api/v1/branch/get-by-branchId/'+id)
    }
}