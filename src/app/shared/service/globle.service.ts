import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({
    providedIn:'root'
})

export class GlobleService{

    passwordConfirming(c: AbstractControl): { invalid: boolean } | null {
        if ((c.get('password') as AbstractControl).value !== (c.get('confirmPassword') as AbstractControl).value) {
            return {invalid: true};
        }
        return null
    }

      onlyNumberAlloewd(event:any):boolean{
        if(Number.isNaN(Number(event.key))){
            return false
          }
          return true
      }
}