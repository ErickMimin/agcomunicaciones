import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertsService } from '../../services/shared/alerts.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'ag-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
  constructor(
    private _user: UserService,
    private _fb: FormBuilder,
    private _alert: AlertsService,
    private _router: Router
    ) { }

  ngOnInit() {
    if(this._user.isLogged()){
      if(this._user.getUser().primer_Login)
        this._router.navigate(['/login/change-password']);
      else 
      this._router.navigate(['/home']);
    } 
    this.buildForm();
  }

  buildForm(){
    this.loginForm = this._fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(event: Event): void{
    event.preventDefault();
    this._user.login(new User(this.loginForm.value.user,
      this.loginForm.value.password))
      .subscribe((data: any) => {
        this._user.saveData(data.responseResult);
        if(data.responseResult.user.primer_Login) this._router.navigate(['/login/change-password']);
        else this._router.navigate(['/home']);        
        },error => {
          this._alert.error(error);
        });
  }

}
