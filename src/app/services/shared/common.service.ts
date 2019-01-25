import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { PROD } from 'src/app/config/config';
import { UserService } from '../user/user.service';

@Injectable()
export class CommonService {

  constructor(private _http: Http, private _user: UserService) { }

  createHeader(){
	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', this._user.getToken());
	return headers;
  }

  post(url: string, data: any): Observable<any>{
	if (!PROD) console.log('POST', url,'[data]', data);

	return new Observable(observer => {
		this._http.post(url, data, { headers: this.createHeader() })
			.pipe(
				map( (data: any) => this.extractData(data)),
				catchError( error => this.handleError(error))
			).subscribe((data) => {
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

  put(url: string, data: any): Observable<any>{
	if (!PROD) console.log('PUT', url,'[data]', data);

	return new Observable(observer => {
		this._http.put(url, data, { headers: this.createHeader() })
			.pipe(
				map( (data: any) => this.extractData(data)),
				catchError( error => this.handleError(error))
			).subscribe((data) => {
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

  get(url: string){
	if (!PROD) console.log('GET', url);

	return new Observable(observer => {
		this._http.get(url, { headers: this.createHeader() })
			.pipe(
				map( (data: any) => this.extractData(data)),
				catchError( error => this.handleError(error))
			).subscribe((data) => {
				if (data.success) {
					observer.next(data);
				} else {
					observer.error(data);
				}
				observer.complete();
			},err => {
				observer.error(err);
				observer.complete();
			});
	});
  }

  delete(url: string){
	if (!PROD) console.log('DELETE', url);

	return new Observable(observer => {
		this._http.delete(url, { headers: this.createHeader() })
			.pipe(
				map( (data: any) => this.extractData(data)),
				catchError( error => this.handleError(error))
			).subscribe((data) => {
				if (data.success) {
					observer.next(data);
				} else {
					observer.error(data);
				}
				observer.complete();
			},err => {
				observer.error(err);
				observer.complete();
			});
	});
  }

  extractData(res: Response | any) {
		let body = res.json();
		if (!PROD) console.log(res.url, res.status, body);
		return body || {};
	}

	handleError(error: Response | any): any {
		if (!PROD) console.log(error);
		return throwError(JSON.parse(error['_body']) || error);
	}
}
