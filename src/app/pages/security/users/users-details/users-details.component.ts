import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../services/users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../models/user.model';
import { AlertsService } from '../../../../services/shared/alerts.service';

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
carriers: any[] = [
  {
    "id": 1,
    "nombre": "Telcel"
  },
  {
    "id": 2,
    "nombre": "Movistar"
  },
  {
    "id": 3,
    "nombre": "Att"
  },
  {
    "id": 4,
    "nombre": "Unefon"
  },
  {
    "id": 5,
    "nombre": "Iusacell"
  },
  {
    "id": 6,
    "nombre": "Virgin"
  }
];
rolls: any = [
  {
    "id": 3,
    "nombre": "a",
    "accesos": [
      {
        "id": 10,
        "nombre": "Usuarios",
        "permiso": 2
      },
      {
        "id": 11,
        "nombre": "Roles",
        "permiso": 2
      }
    ]
  },
  {
    "id": 9,
    "nombre": "b",
    "accesos": [
      {
        "id": 11,
        "nombre": "Roles",
        "permiso": 1
      },
      {
        "id": 10,
        "nombre": "Usuarios",
        "permiso": 1
      }
    ]
  }
];
user: any = {
  nombre_Usuario: '',
  person: 1
};
  constructor(
    private _actroute: ActivatedRoute,
    private _users: UsersService,
    private _fb: FormBuilder,
    private _alert: AlertsService
    ) { }

  ngOnInit() {    
    this._actroute.params.subscribe(params => {
      if(params.id){
        this.isNew = false;
        this._users.getUserById(params.id).subscribe(data =>{
          this.user = data.responseResult.user;
          for(let key in this.form.get('user').value){
            this.form.get('user').get(key).setValue(this.user[key]);
          }
       });
      }else this.isNew = true;
          
    });
    this.buildForm();
  }

  ngAfterViewInit(){    
    $('select').formSelect();
  }

  buildForm(user?: User){
    this.form = this._fb.group({
      user: this._fb.group({
        nombre: ['', [Validators.required]],
        apellido_Paterno: ['', [Validators.required]],
        apellido_Materno: ['', [Validators.required]],
        // rfc: ['', [Validators.required]],
        email: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        carrier: this._fb.group({
          id: ['', [Validators.required]],
          nombre: ['']
        }),
        rol: this._fb.group({
          id: ['', [Validators.required]],
          nombre: ['']
        }) 
      })
    });
  }

  togglePerson(){
    if(this.user.person == 2) this.user.person = 1;
    else this.user.person = 2;
  }

  registerUser(){
    let user = this.form.get('user').value;
    let id = this.form.value.user.carrier.id;
    user.carrier.nombre = this.carriers.find(x => x.id == id).nombre;
    let id2 = this.form.value.user.rol.id;
    user.rol.nombre = this.rolls.find(x => x.id == id2).nombre;
    console.log(user);
    if(this.isNew){
      this._users.registerUser(user).subscribe(data => {
        this._alert.success({text: 'El usuario ha sido creado exitosamente'});
      }, err => {
        this._alert.error({text: err.responseMessage});
      });
    }
  }

}
