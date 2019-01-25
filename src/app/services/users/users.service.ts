import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../../config/config';

import { CommonService } from '../shared/common.service';

@Injectable()
export class UsersService {
urlService = BASE_URL + 'users/';
urlService2 = BASE_URL + 'modulos';

  constructor(private _common: CommonService) { }

  getModules(){
    return this._common.get(this.urlService2);
  }

  getUsers(): Observable<any>{
    return this._common.get(this.urlService);
  }

  getUserById(id: number): Observable<any>{
    return this._common.get(this.urlService + id);
  }

  lockUser(id: number){
    return this._common.get(this.urlService + id +'/lock');
  }

  registerUser(user: any){
    return this._common.post(this.urlService,{user: user});
  }

  updateUser(id: number, user: any){
    return this._common.put(this.urlService + id,{user: user});
  }

  deleteUser(id: number){
    return this._common.delete(this.urlService + id);
  }



}
