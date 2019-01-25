import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable()
export class LoaderService {
  private loaderSubject = new Subject<boolean>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }
  
  show() {
    this.loaderSubject.next(<boolean>true);
  }

  hide() {
    this.loaderSubject.next(<boolean>false);
  }

}
