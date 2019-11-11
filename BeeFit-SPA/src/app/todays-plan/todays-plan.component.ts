import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todays-plan',
  templateUrl: './todays-plan.component.html',
  styleUrls: ['./todays-plan.component.css']
})
export class TodaysPlanComponent implements OnInit {

  constructor() {

  }


  ngOnInit() {
  }
  prepareDatePicker() {
    var today = new Date();
  }

}
