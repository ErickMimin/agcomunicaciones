import { Injectable } from '@angular/core';
import { BASE_URL } from '../../config/config';
import { CommonService } from '../shared/common.service';
import { Observable } from 'rxjs';

@Injectable()
export class CarrierService {
urlService = BASE_URL + 'carrier';
  constructor(private _common: CommonService) { }

  getCarriers(): Observable<any>{
    return this._common.get(this.urlService);
  }

}
