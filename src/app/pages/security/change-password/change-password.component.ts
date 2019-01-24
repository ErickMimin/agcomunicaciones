import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from '../../../services/shared/alerts.service';
import { PasswordValidation } from 'src/app/validators/password.validation';
import { ChangePasswordService } from '../../../services/user/change-password.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'ag-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
form: FormGroup;
isSubmitted: boolean = false;
  constructor(
    private _alert: AlertsService,
    private _cp: ChangePasswordService,
    private _fb: FormBuilder, 
    private _router: Router,
    private _user: UserService
    ) {
      this.buildForm();
     }

  ngOnInit() {
    
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

  changePassword(){
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
