import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UsersComponent } from './users/users.component';
import { RollsComponent } from './rolls/rolls.component';

// Routes
import { ROUTES_SECURITY } from './security.routing';
import { UsersDetailsComponent } from './users/users-details/users-details.component';
import { RollsDetailsComponent } from './rolls/rolls-details/rolls-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
    declarations: [
        ChangePasswordComponent,
        UsersComponent,
        RollsComponent,
        UsersDetailsComponent,
        RollsDetailsComponent
    ],
    imports: [
        ROUTES_SECURITY,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PipesModule
    ]
  })
export class SecurityModule { }