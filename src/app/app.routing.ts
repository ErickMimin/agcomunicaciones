import { Routes, RouterModule } from '@angular/router';


import { LobbyComponent } from './lobby/lobby.component';
import { LoginComponent } from './lobby/login/login.component';
import { RecoveryPasswordComponent } from './lobby/recovery-password/recovery-password.component';
import { FirstLoginComponent } from './lobby/first-login/first-login.component';

const ROUTES: Routes = [
    {
        path: 'login',
        component: LobbyComponent,
        children: [
            { path: '', component: LoginComponent },
            { path: 'recovery', component: RecoveryPasswordComponent },
            { path: 'change-password', component: FirstLoginComponent }
        ]
    },
    {path: '', redirectTo:'home', pathMatch:'full'},
    {path: '**', redirectTo:'/login', pathMatch:'full'}
];

export const ROUTES_APP = RouterModule.forRoot( ROUTES );