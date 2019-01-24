import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../../validators/password.validation';
import { AlertsService } from '../../services/shared/alerts.service';
import { Router } from '@angular/router';
import { ChangePasswordService } from '../../services/user/change-password.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'ag-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {
form: FormGroup;
isSubmitted: boolean = false
  constructor(
    private _fb: FormBuilder,
    private _alert: AlertsService,
    private _router: Router,
    private _cp: ChangePasswordService,
    private _user: UserService
    ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.form = this._fb.group({
        old: ['', Validators.required],
        passwords: this._fb.group({
          new: ['', Validators.required],
          confirm: ['', Validators.required]
        },{ validator: PasswordValidation.MatchPassword })
    });
  }

  changePassword(event: Event){
    event.preventDefault();
    this.isSubmitted = true;
    if(this.form.valid)
      this._cp.changePassword({
        passwords: {
          old: this.form.get('old').value,
          new: this.form.get('passwords').get('confirm').value
        }
      }).subscribe(data => {
        this._alert.success({
         text: data.responseMessage
        },result => {
          this._user.deleteData();
          this._router.navigate(['/login']);
        });
      }, err => {
        this._alert.error({
          text: err.responseMessage
        });
      });
  }
}
