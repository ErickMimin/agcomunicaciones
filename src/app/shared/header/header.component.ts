import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'ag-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _router: Router,
    private _user: UserService
  ) { }

  ngOnInit() {
  }

  logOut(): void{
    this._user.deleteData();
    this._router.navigate(['/login']);
  }

}
