import { NgModule } from '@angular/core';

// Components
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';

// Routes
import { ROUTES_PAGES } from './pages.routing';

// Modules
import { SharedModule } from '../shared/shared.module';
import { SecurityModule } from './security/security.module';


@NgModule({
    declarations: [
        HomeComponent,
        PagesComponent
    ],
    imports: [
        ROUTES_PAGES,
        SecurityModule,       
        SharedModule
    ]
  })
export class PagesModule { }