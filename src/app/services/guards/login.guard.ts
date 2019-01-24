import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    public _user: UserService,
    public _router: Router
  ) {}

  canActivate() {

    if ( this._user.isLogged() ) {
      if(this._user.getUser().primer_Login){
        this._router.navigate(['/login']);
        return false;
      }else
        return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }

  }
}