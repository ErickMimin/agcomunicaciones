import { Injectable } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { BASE_URL } from '../../config/config';
import { Observable } from 'rxjs';

@Injectable()
export class RollsService {
urlService = BASE_URL + 'rolls/';
urlService2 = BASE_URL + 'modulos';
constructor(
    private _common: CommonService
  ) { }

  getModules(){
    return this._common.get(this.urlService2);
  }

  getRolls(): Observable<any>{
    return this._common.get(this.urlService);
  }

  getRolById(id: number){
    return this._common.get(BASE_URL + 'rolls/'+id);
  }

  registerRol(roll: any){
    return this._common.post(this.urlService,{roll: roll});
  }

  updateRol(id: number, roll: any){
    return this._common.put(this.urlService + id,{roll: roll});
  }

  lockRol(id: number){
    return this._common.get(this.urlService + id +'/lock');
  }

  deleteRol(id: number){
    return this._common.delete(this.urlService + id);
  }

}
