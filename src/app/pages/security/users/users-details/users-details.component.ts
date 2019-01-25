import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../../services/users/users.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { User } from '../../../../models/user.model';
import { AlertsService } from '../../../../services/shared/alerts.service';
import { CarrierService } from '../../../../services/carrier/carrier.service';
import { LoaderService } from '../../../../services/shared/loader.service';
import { RollsService } from '../../../../services/rolls/rolls.service';

declare let $: any;
@Component({
  selector: 'ag-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {
@ViewChild('carrier') private carrier: ElementRef;
form: FormGroup;
isNew: boolean = false;
carriers: any[] = [];
rolls: any[] = [];
user: any = {
  nombre_Usuario: ''
};
  constructor(
    private _actroute: ActivatedRoute,
    private _users: UsersService,
    private _fb: FormBuilder,
    private _alert: AlertsService,
    private _router: Router,
    private _carrier: CarrierService,
    private _loader: LoaderService,
    private _rolls: RollsService
    ) { 
    }
    
    ngOnInit() {    
      this.buildForm();
      this._actroute.params.subscribe(params => {
        if(params.id){
          this.isNew = false;
          this._users.getUserById(params.id).subscribe(data =>{
            this.user = data.responseResult.user;
            delete this.user.accesos;
            for(let key in this.form.value.user){
              if(typeof this.user[key] === 'object')
                this.form.get('user').get(key).get('id').setValue(this.user[key].id);
              else if(key != 'accesos'){
                this.form.get('user').get(key).setValue(this.user[key]);
              }
            }
            
            this._users.getModules().subscribe((data: any )=> {
              data.responseResult.modulos.forEach(x => {
                  (<FormArray>this.form.get('user').get('accesos')).push(this._fb.group({
                    id: [x.id],
                    nombre: [x.nombre]
                  }));
                });
            });
          });
        }else{
          this.isNew = true;
        } 
        
      });
    }
    
  ngAfterViewInit(){    
    this.fillFields();
  }

  buildForm(user?: User){
    this.form = this._fb.group({
      user: this._fb.group({
        nombre: ['', [Validators.required]],
        RFC: ['', [Validators.required]],
        Tipo_Persona: [1 , [Validators.required]],
        Razon_Social: ['', [Validators.required]],
        apellido_Paterno: ['', [Validators.required]],
        apellido_Materno: ['', [Validators.required]],
        // rfc: ['', [Validators.required]],
        email: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        carrier: this._fb.group({
          id: ['', [Validators.required]]
        }),
        rol: this._fb.group({
          id: ['', [Validators.required]]
        }),
        accesos: this._fb.array([])
      })
    });
  }

  fillFields(){ 
    this._rolls.getRolls().subscribe(data => {
      this.rolls = data.responseResult.rolls;
    }, null, // por el momento
    () => {
      this._carrier.getCarriers().subscribe(data => {
        this.carriers = data.responseResult.carrier[0];
        setTimeout( () => $('select').formSelect(), 500); // Por el momento, quitar cuando se integre ng m
      },err => {
        setTimeout( () => $('select').formSelect(), 500); // Por el momento, quitar cuando se integre ng m
      });
    });
  }

  togglePerson(){
    if( this.form.value.user.Tipo_Persona == 2) this.form.get('user').get('Tipo_Persona').setValue(1);
    else this.form.get('user').get('Tipo_Persona').setValue(2);
  }

  registerUser(){
    let user = this.form.get('user').value;
    user.tipo_persona = this.form.get('user').value.Tipo_Persona;
    user.razon_social = this.form.get('user').value.Razon_Social;
    user.rfc = this.form.get('user').value.RFC;

    this._loader.show();
    if(this.isNew){
      this._users.registerUser(user).subscribe(data => {
        this._loader.hide();
        this._alert.success({text: 'El usuario ha sido creado exitosamente'}, 
        () => {
          this._router.navigate(['..'],{relativeTo: this._actroute});
        });
      }, err => {
        this._loader.hide();
        this._alert.error({text: err.responseMessage});
      });
    } else {
      this._users.updateUser(this.user.id, user).subscribe(data => {
        this._loader.hide();
        this._alert.success({text: 'El usuario ha sido actualizado exitosamente'}, 
        () => {
          this._router.navigate(['..'],{relativeTo: this._actroute});
        });
      }, err => {
        this._loader.hide();
        this._alert.error({text: err.responseMessage});
      }); 
    }
  }

}
