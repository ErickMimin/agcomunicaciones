import { Injectable } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { BASE_URL } from '../../config/config';
import { Observable } from 'rxjs';

@Injectable()
export class RollsService {
urlService = BASE_URL + 'rolls';
  constructor(
    private _common: CommonService
  ) { }

  getRolls(): Observable<any>{
    return this._common.get(this.urlService);
  }

  getRolById(id: number){
    return this._common.get(BASE_URL + 'roll/'+id);
  }

}
