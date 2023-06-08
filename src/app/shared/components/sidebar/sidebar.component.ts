import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SetAdmin } from "../../model/common.modal";
import { Roles } from "../../utils/enums";
import { Images } from "../../utils/images-enum";

@Component({
    selector: 'app-sidebar',
    templateUrl:'./sidebar.component.html',
    styles: [`
    
    .sidebar{
        width: 12vw; 
        height:100%;
        background-color: white;
        box-shadow: 0px 5px 8px var(--primary-shadow);
        background: linear-gradient(to top,var(--secondary),var(--primary));
        padding: 1.2rem 0;
        color: white;
        position: relative
    }
    hr{
        opacity: .70;
    }

    .side-nav{
        list-style: none;
        margin: 0;
        padding: 0;
        margin-top:2rem ;
    }
    .side-nav a{
        display: block;
        padding: 1rem 2rem;
        word-spacing: 5px;
        font-size: larger;
        text-decoration: none;
        color: inherit;
        transition: backdrop-filter .3s ease;
    }
    .side-nav a.active{
        backdrop-filter: brightness(95%);
        border-left: 5px solid white;
        padding-left: 1.71rem;
    }
    .side-nav a i{
        font-size: x-large;
    }
    .btn-logout{
        position: absolute;
        bottom: 5rem;
        font-size: 1.4rem;
        left: 50%;
        transform: translateX(-50%);
        display:flex;
        align-items:center;
        gap:.5rem;
        color:white;

    }
    .btn-logout:focus{
        border:none;
    }
    .btn-logout:hover{
        color:rgba(0,0,0,.8);
    }
        `]
    })

export class SidebarComponent {
    public get images(){
        return Images
    }
    public get roles(){
        return Roles
    }
    currentUser!:SetAdmin
    constructor(private _route: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string)  
    }
    logout(){
        localStorage.removeItem('currentUser')
        this._route.navigateByUrl('')
    }
}