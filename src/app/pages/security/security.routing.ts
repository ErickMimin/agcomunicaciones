import { Routes, RouterModule } from '@angular/router';

// Components
import { UsersComponent } from './users/users.component';
import { RollsComponent } from './rolls/rolls.component';
import { PagesComponent } from '../pages.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginGuard } from '../../services/guards/login.guard';
import { UsersDetailsComponent } from './users/users-details/users-details.component';
import { RollsDetailsComponent } from './rolls/rolls-details/rolls-details.component';

const ROUTES: Routes = [
    {
        path: 'security',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'users', component: UsersComponent },
            { path: 'users/new', component: UsersDetailsComponent },
            { path: 'users/:id', component: UsersDetailsComponent },
            { path: 'rolls', component: RollsComponent },
            { path: 'rolls/new', component: RollsDetailsComponent },
            { path: 'rolls/:id', component: RollsDetailsComponent },
            { path: 'change-password', component: ChangePasswordComponent }
        ]
    }
];

export const ROUTES_SECURITY = RouterModule.forChild( ROUTES );