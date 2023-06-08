import { NgModule } from "@angular/core";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { ConfirmPopupComponent } from "./components/confirm-popup/confirm-popup.component";
import { DateFormatPipe } from "./pipe/date-format.pipe";

@NgModule({
    declarations:[
        SidebarComponent,
        ConfirmPopupComponent,
        DateFormatPipe
    ],
    imports:[
        RouterModule,
        ReactiveFormsModule,
        CommonModule
        
    ],
    exports:[SidebarComponent,ConfirmPopupComponent,DateFormatPipe]
})

export class ShareModule{

}