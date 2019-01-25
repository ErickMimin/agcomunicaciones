import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { AlertsService } from '../../../services/shared/alerts.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

declare let $: any;
@Component({
  selector: 'ag-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
@ViewChild('table') private table: ElementRef;
users: any[] = [];
search: any;
  constructor(
    private _users: UsersService,
    private _alert: AlertsService,
    private _user: UserService
    ) { 
  }

  ngOnInit() {
    this.getUsers();
  }

  ngAfterViewInit(){
    $(this.table.nativeElement).collapsible();
  }

  getUsers(): void{
    this._users.getUsers().subscribe(data => {
      this.users = data.responseResult.users;
    },null,() => {
      setTimeout(() => $(this.table.nativeElement).collapsible('open', 0), 100);
    });
  }

  deleteUser(id: number){
    this._alert.warning({text: '¿Estás seguro que deseas eliminar este usuario?', showCancelButton: true},
    (result) => {
      if(result.value)
        this._users.deleteUser(id).subscribe((data: any) => {
          this._alert.success({text: data.responseMessage }, 
           this.getUsers());
        },err => {
          this._alert.error({text: err.responseMessage, title: 'Ocurrio un error'});
        });
    });
  }

  resetUsers(mail:string){
    this._alert.warning({text: '¿Estás seguro que deseas reestablecer a este usuario?', showCancelButton: true},
    (result) => {
      if(result.value)
        this._user.reset(mail).subscribe((data: any) => {
          this._alert.success({text: data.responseMessage }, 
           this.getUsers());
        },err => {
          this._alert.error({text: err.responseMessage, title: 'Ocurrio un error'});
        });
    });
  }

  toggleState(index: number){
    this.users[index].activo = !this.users[index].activo;
    this._alert.warning({text: `¿Estás seguro que deseas ${this.users[index].activo ? 'debloquear' : 'bloquear'} este usuario?`, showCancelButton: true},
    (result) => {
      if(result.value)
      this._users.lockUser(this.users[index].id).subscribe((data: any) => {
        this._alert.success({text: data.responseMessage });
        },err => {
          this.users[index].activo = !this.users[index].activo;
          this._alert.error({text: err.responseMessage, title: 'Ocurrio un error'});
        });
        else 
         this.users[index].activo = !this.users[index].activo;
    });
  }

  trackByFn(index: number, item: any){
    return item.id
  }

}
