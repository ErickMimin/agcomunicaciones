import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { LoginGuard } from '../services/guards/login.guard';


const ROUTES: Routes = [
    {
        path: 'home',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            { path: '', component: HomeComponent },
        ]
    }
];

export const ROUTES_PAGES = RouterModule.forChild( ROUTES );