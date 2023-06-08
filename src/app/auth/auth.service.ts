import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { Authencate, loginDto, NewPassword } from "./auth.modal";

@Injectable({
    providedIn:'root'
})
export class AuthService{
    baseUrl = environment.baseUrl
    constructor(private _http:HttpClient){}
    login(requestPayload:loginDto):Observable<loginDto>{
        return this._http.post<loginDto>(this.baseUrl+'api/v1/employee/sign-in',requestPayload)
    }

    authenticate(requestPayload: Authencate):Observable<Authencate> {
        return this._http.post<Authencate>(this.baseUrl +'api/v1/employee/validate-user',requestPayload)   
    }
    
    changePassword(requestPayload: NewPassword):Observable<NewPassword> {
        return this._http.post<NewPassword>(this.baseUrl +'api/v1/employee/change-password',requestPayload)   
    }

    
}