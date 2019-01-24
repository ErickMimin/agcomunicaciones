import { Injectable } from '@angular/core';
import swal, { SweetAlertOptions } from'sweetalert2';

@Injectable()
export class AlertsService {
configAlert = {
  confirmButtonClass: 'waves-effect waves-light btn blue accent-1 btn-alert',
  cancelButtonClass: 'waves-effect waves-light btn blue accent-1 btn-alert',
  confirmButtonText:  'Aceptar'
};
  constructor() { }

  error(alert: SweetAlertOptions): void{
    alert.type = 'error';
    swal.fire(Object.assign(this.configAlert, alert));
  }

  warning(alert: SweetAlertOptions, then?: any){ // then is a funtion
    alert.type = 'warning';
    swal.fire(Object.assign(this.configAlert, alert)).then(then);
  }

  success(alert: SweetAlertOptions, then?: any){
    alert.type = 'success';
    swal.fire(Object.assign(this.configAlert, alert)).then(then);
  }

}
