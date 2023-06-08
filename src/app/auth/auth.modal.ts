export interface loginDto{
    email:string,
    password:string
}


export interface Authencate{
    email: string,  
}

export interface NewPassword{
    email:string
    newPassword: string
    confirmPassword?:string
}