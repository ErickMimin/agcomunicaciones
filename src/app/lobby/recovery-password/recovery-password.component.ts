import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormControl, Validators } from '@angular/forms';
import { AlertsService } from '../../services/shared/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ag-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {
mail: FormControl;
isSubmitted: boolean = false;
isLoading: boolean = false;
  constructor(
    private _user: UserService, 
    private _alert:AlertsService,
    private _router:Router
    ) { }

  ngOnInit() {
    this.mail = new FormControl('',[Validators.email,Validators.required]);
  }

  sendMail(){
    this.isSubmitted = true;
    if(this.mail.valid){
      this.isLoading = true;
      this._user.reset(this.mail.value).subscribe(data => {
        this._alert.success({
          text: 'Se ha enviado un correo electrónico con una contraseña temporal'
        }, () => {
          this._router.navigate(['/login']);
        });
      },err =>{
        this.isLoading = false;
        this._alert.error({
          text: err.responseMessage
        });
      });
    }
  }

}
