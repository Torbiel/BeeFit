import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  now: Date;
  selectedDate: Date;
  localeString: string = 'en';
  visibleDates: Array<{ date: Date, index:number }> = [];
  subscribedParam = "initial value";

  constructor(private route: ActivatedRoute) {

    this.now = new Date();
    this.selectedDate = this.now;
    this.selectedDate.setDate(this.selectedDate.getDate());;
    console.log(this.selectedDate);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subscribedParam = params.get("date");
    });
    this.prepareWeek();

  }

  // ngAfterViewInit() {

  //   var dateItems = document.querySelectorAll<HTMLElement>('.carousel-list li'), i;

  //   for (i = 0; i < dateItems.length; ++i) {
  //     dateItems[i].classList.add('carousel-seat');

  //   }
  //   dateItems[dateItems.length - 1].classList.add('is-ref');
  // }

  prepareWeek() {
    var weekDaySelected = this.selectedDate.getDay();
    if (!weekDaySelected) {
      weekDaySelected = 7;
    }
    for(let i=0; i < 9; i++) {
      var weekDay = weekDaySelected - i;
      this.visibleDates[i-1] = {date:  new Date(), index: i-1};
      this.visibleDates[i-1].date.setDate(this.selectedDate.getDate() - weekDay-1);
    };


  }

  slideDate(direction: string) {
    // console.log(this.visibleDates);
    // let datesList = document.querySelector('.carousel-list');
    // var dateItem = document.querySelector('.date-item');
    // var listPosition = parseFloat(window.getComputedStyle(datesList).getPropertyValue("left"));

    var sizeOfList = this.visibleDates.length;

    if (direction == 'forward') {
      for (let i = 0; i < sizeOfList; i++) {
        this.visibleDates[i].date.setDate(this.visibleDates[i].date.getDate() + 1);
        console.log(this.visibleDates[i]);
      }
      // this.visibleDates[sizeOfList] = Object.assign({}, this.visibleDates[sizeOfList - 1]);
      // this.visibleDates[sizeOfList].date = new Date(this.visibleDates[sizeOfList - 1].date.setDate(this.visibleDates[sizeOfList - 1].date.getDate() + 1));
    } else {
      for (let i = 0; i < sizeOfList; i++) {
        this.visibleDates[i].date.setDate(this.visibleDates[i].date.getDate() - 1);
      }
    }

   //this.visibleDates[sizeOfList].index = sizeOfList;
  // sizeOfList++;
  }

}
