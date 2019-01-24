import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

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
  constructor(private _users: UsersService) { 
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

}
