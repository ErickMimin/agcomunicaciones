import { Injectable } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { BASE_URL } from '../../config/config';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class ChangePasswordService {
urlService = BASE_URL + 'changepassword';
  constructor(private _common: CommonService, private _user: UserService) { }

  changePassword(data: any): Observable<any>{
    data.user = this._user.getUser().id;
    return this._common.post(this.urlService, data);
  }

}
