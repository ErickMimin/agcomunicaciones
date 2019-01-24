
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginGuard } from './guards/login.guard';

import { UserService } from './user/user.service';
import { CommonService } from './shared/common.service';
import { HttpModule } from '@angular/http';
import { AlertsService } from './shared/alerts.service';
import { UsersService } from './users/users.service';
import { RollsService } from './rolls/rolls.service';
import { ChangePasswordService } from './user/change-password.service';


@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    UserService,
    CommonService,
    AlertsService,
    UsersService,
    RollsService,
    ChangePasswordService,
    LoginGuard
  ],
  declarations: []
})
export class ServicesModule { }