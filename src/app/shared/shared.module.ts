import { NgModule } from "@angular/core";

// Components
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

// Module
import { RouterModule } from '@angular/router';
import { ServicesModule } from "../services/service.module";

@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent
    ],
    exports: [
        SidebarComponent,
        HeaderComponent
    ],
    imports: [
        RouterModule
    ]
})
export class SharedModule { }