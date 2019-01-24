import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ag-rolls-details',
  templateUrl: './rolls-details.component.html',
  styleUrls: ['./rolls-details.component.css']
})
export class RollsDetailsComponent implements OnInit {

  constructor(
    private _actroute: ActivatedRoute    
  ) { }

  ngOnInit() {
    
  }

}
