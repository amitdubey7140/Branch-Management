import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { FilterModel, SetAdmin } from "../shared/model/common.modal";

@Injectable({
    providedIn:'root'
})

export class EmployeeService{
    baseUrl = environment.baseUrl
    selectedEmps:{empId:number,empName:string}[] = []

    constructor(private _http:HttpClient){}
    
    // getSelectedEmps(empIds:string):Observable<SetAdmin> {
    //     return this._http.get<SetAdmin>(this.baseUrl+'api/v1/employee/get-by-employeeIds/'+empIds);
    // }
}