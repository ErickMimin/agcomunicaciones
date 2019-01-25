import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RollsService } from '../../../services/rolls/rolls.service';
import { AlertsService } from '../../../services/shared/alerts.service';


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
    private _rolls: RollsService,
    private _alert: AlertsService
  ) { }

  ngOnInit() {
    this.getRolls();
  }

  ngAfterViewInit(){
    $(this.table.nativeElement).collapsible();
  }

  getRolls(){
    this._rolls.getRolls().subscribe((data: any) =>{
      this.rolls = data.responseResult.rolls;
    });
  }

  deleteRoll(id: number){
    this._alert.warning({text: '¿Estás seguro que deseas eliminar este usuario?', showCancelButton: true},
    (result) => {
      if(result.value)
        this._rolls.deleteRol(id).subscribe((data: any) => {
          this._alert.success({text: data.responseMessage }, 
           this.getRolls());
        },err => {
          this._alert.error({text: err.responseMessage, title: 'Ocurrio un error',showCancelButton: false})
        });
    });
  }

  toggleState(index: number){
    this.rolls[index].activo = !this.rolls[index].activo;
    this._alert.warning({text: `¿Estás seguro que deseas ${this.rolls[index].activo ? 'debloquear' : 'bloquear'} este usuario?`, showCancelButton: true},
    (result) => {
      if(result.value)
      this._rolls.lockRol(this.rolls[index].id).subscribe((data: any) => {
        this._alert.success({text: data.responseMessage });
        },err => {
          this.rolls[index].activo = !this.rolls[index].activo;
          this._alert.error({text: err.responseMessage, title: 'Ocurrio un error'});
        });
        else 
         this.rolls[index].activo = !this.rolls[index].activo;
    });
  }

  trackByFn(index: number, item: any){
    return item.id
  }

}
