import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RollsService } from '../../../services/rolls/rolls.service';


declare let $: any;
@Component({
  selector: 'ag-rolls',
  templateUrl: './rolls.component.html',
  styleUrls: ['./rolls.component.css']
})
export class RollsComponent implements OnInit {
@ViewChild('table') private table: ElementRef;
rolls: any[] = [];
search: any;
  constructor(
    private _rolls: RollsService
  ) { }

  ngOnInit() {
    this.getRolls();
  }

  ngAfterViewInit(){
    $(this.table.nativeElement).collapsible();
  }

  getRolls(){
    this._rolls.getRolls().subscribe((data: any) =>{
      this.rolls = data.responseResult;
    });
  }

}
