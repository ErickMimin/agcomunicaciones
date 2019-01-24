import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


declare let $: any;
@Component({
  selector: 'ag-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
@ViewChild('sidenav') private sideNav: ElementRef;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    $(this.sideNav.nativeElement).sidenav();
  }

  logOut(): void{
    this._router.navigate(['/login']);
  }

}
