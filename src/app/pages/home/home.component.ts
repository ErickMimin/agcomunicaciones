import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'ag-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
userName: string = '';
  constructor(private _user: UserService) { }

  ngOnInit() {
    let user = this._user.getUser();
    this.userName = `${user.nombre} ${user.apellido_Paterno} ${user.apellido_Materno}`;
  }

}
