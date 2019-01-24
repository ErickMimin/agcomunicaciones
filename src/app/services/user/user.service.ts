import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';

import { CommonService } from '../shared/common.service';

import { User } from '../../models/user.model';
import { CURRENT_USER, BASE_URL, PROD } from '../../config/config';


@Injectable()
export class UserService {
urlService = BASE_URL  + 'login';
urlService2 = BASE_URL  + 'resetpassword';
  constructor( private _http: Http) { }

  login(user: User){
    return new Observable(observer => {
			this._http.post(this.urlService, user)
        .pipe(timeout(7000),
          map((data: any) => {
            let body = data.json();
		        if (!PROD) console.log(data.url, data.status, body);
		        return body || {};
          }),
          catchError(error => {
            if (!PROD) console.log(error);
		        return throwError(JSON.parse(error['_body']) || error);
          }))
				.subscribe((data) => {
					if (data.success) 
						observer.next(data);
					else 
						observer.error({ title: 'Error', text: data.mensaje });
          observer.complete();
				}, (error) => {
					if (error.name == 'TimeoutError') {
						observer.error({ title: 'Tiempo de respuesta excedido', text: 'El servidor ha tardado mucho en responder, intente de nuevo más tarde' });
					} else {
						observer.error({ title: 'Ocurrio un error', text: error.responseMessage });
					}
					observer.complete();
				});
		});
	}

	reset(mail: string): Observable<any>{
			return new Observable(observer => {
				this._http.post(this.urlService2, {
					mail: mail
				}).pipe(
					map((data: any) => {
						let body = data.json();
						if (!PROD) console.log(data.url, data.status, body);
						return body || {};
					}),
					catchError(error => {
						if (!PROD) console.log(error);
						return throwError(JSON.parse(error['_body']) || error);
				})).subscribe((data) => {
						if (data.success) {
							observer.next(data);
						} else {
							observer.error(data);
						}
						observer.complete();
					}, err => {
						observer.error(err);
						observer.complete();
					});
			});
	}

  isLogged(): boolean {
		let token = this.getToken();
		return token !== undefined && token !== null;
	}

  saveData(data: any){
    console.log(data);
    localStorage.setItem(CURRENT_USER, JSON.stringify(data));
  }

  deleteData(): void {
    localStorage.removeItem(CURRENT_USER);
  }

  getToken(): string {
		let token = undefined;
		if (localStorage.getItem(CURRENT_USER)) {
			token = JSON.parse(localStorage.getItem(CURRENT_USER)).token;
		}
		return token;
  }

  getUser(): User {
		let user = new User();
		if (localStorage.getItem(CURRENT_USER)) {
			user = JSON.parse(localStorage.getItem(CURRENT_USER)).user;
		}
		return user;
	} 


}
