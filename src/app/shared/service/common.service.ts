import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { SetAdmin, AddBranchModel, AddOrganisationModel, FilterModel } from '../model/common.modal';


@Injectable({
  providedIn: "root",
})
export class CommonService {
  baseUrl = environment.baseUrl;
  orgData!: AddOrganisationModel;
  constructor(private _http: HttpClient) {}
  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(
      this.baseUrl + "api/v1/employee/delete-employee/" + id
    );
  }

  updateEmployee(requestPayload: SetAdmin): Observable<SetAdmin> {
    return this._http.put<SetAdmin>(
      this.baseUrl + "api/v1/employee/update-employee",
      requestPayload
    );
  }
  addEmployee(requestPayload: SetAdmin): Observable<SetAdmin> {
    return this._http.post<SetAdmin>(
      this.baseUrl + "api/v1/employee/save-employee",
      requestPayload
    );
  }
  updateBranch(requestPayload: AddBranchModel): Observable<AddBranchModel> {
    return this._http.put<AddBranchModel>(
      this.baseUrl + "api/v1/branch/update-branch",
      requestPayload
    );
  }
  deleteBranch(id: number): Observable<any> {
    return this._http.delete(
      this.baseUrl + "api/v1/branch/delete-branch/" + id
    );
  }
  
  getEmpById(id: number): Observable<SetAdmin> {
    return this._http.get<SetAdmin>(
      this.baseUrl + "api/v1/employee/get-by-employeeId/" + id
    );
  }

  getOrgList(): Observable<AddOrganisationModel[]> {
    return this._http.get<AddOrganisationModel[]>(
      this.baseUrl + "api/v1/organisation/get-all-organisation"
    );
  }
  getAllBranches(): Observable<AddBranchModel[]> {
    return this._http.get<AddBranchModel[]>(
      this.baseUrl + "api/v1/branch/get-all-branch"
    );
  }
   getAllEmployees(requestPayload:FilterModel):Observable<SetAdmin[]>{
        return this._http.post<SetAdmin[]>(this.baseUrl+'api/v1/employee/search-with-filter',requestPayload)
    }
}
