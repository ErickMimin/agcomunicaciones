import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/shared/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ag-comunicaciones-aw';
  show: boolean = false;
  private subscription: Subscription;
  constructor(
    private _loader: LoaderService
  ){

  }

  ngOnInit(){
    this.subscription = this._loader.loaderState
    .subscribe((state: boolean) => {
        this.show = state;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
