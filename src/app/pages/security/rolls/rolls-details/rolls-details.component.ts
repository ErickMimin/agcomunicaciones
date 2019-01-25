import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RollsService } from '../../../../services/rolls/rolls.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AlertsService } from '../../../../services/shared/alerts.service';
import { LoaderService } from '../../../../services/shared/loader.service';

@Component({
  selector: 'ag-rolls-details',
  templateUrl: './rolls-details.component.html',
  styleUrls: ['./rolls-details.component.css']
})
export class RollsDetailsComponent implements OnInit {
form: FormGroup;
isNew: boolean = false;
roll: any;
  constructor(
    private _actroute: ActivatedRoute,
    private _rolls: RollsService ,
    private _fb: FormBuilder,
    private _alert: AlertsService,
    private _router: Router,
    private _loader: LoaderService
  ) { }

  ngOnInit() {
    this.buildForm();
    this._actroute.params.subscribe(params => {
      if(params.id){
        this._rolls.getRolById(params.id).subscribe((data: any) => {
          this.roll = data.responseResult.roll;
          for(let key in this.form.value){
            if(key != 'accesos')
            this.form.get(key).setValue(this.roll[key]);
          }

        });
      } else this.isNew = true;
      
      this._rolls.getModules().subscribe((data: any) => {
        
        data.responseResult.modulos.forEach(x => {
          (<FormArray>this.form.get('accesos')).push(this._fb.group({
            id: [x.id],
            nombre: [x.nombre]
          }));
        });
      });
      
    });
  }

  buildForm(){
    this.form = this._fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      accesos: this._fb.array([])
    });
  }

  registerRoll(){
    if(this.isNew)
      this._rolls.registerRol(this.form.value).subscribe(data => {
        this._loader.hide();
        this._alert.success({text: 'El rol ha sido creado exitosamente'}, 
        () => {
          this._router.navigate(['..'],{relativeTo: this._actroute});
        });
      }, err => {
        this._loader.hide();
        this._alert.error({text: err.responseMessage});
      });
      else 
        this._rolls.updateRol(this.roll.id,this.form.value).subscribe(data => {
          this._loader.hide();
          this._alert.success({text: 'El rol ha sido actualizado exitosamente'}, 
          () => {
            this._router.navigate(['..'],{relativeTo: this._actroute});
          });
        }, err => {
          this._loader.hide();
          this._alert.error({text: err.responseMessage});
        });
  }

}
