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
  visibleDates: Array<{ date: Date, index: number }> = [];
  subscribedParam = "initial value";

  constructor(private route: ActivatedRoute) {

    this.now = new Date();
    this.selectedDate = this.now;
    this.prepareWeek();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subscribedParam = params.get("date"); console.log(this.subscribedParam);
    });
  }

  prepareWeek() {
    var weekDaySelected = this.selectedDate.getDay();
    for (let i = 1; i <= 9; i++) {
      var weekDay = weekDaySelected - i;
      this.visibleDates[i - 1] = { date: new Date(), index: i - 1 };
      this.visibleDates[i - 1].date.setDate(this.selectedDate.getDate() - weekDay - 1);
    };
  }

  slideDate(direction: string) {

    var datesList = document.querySelector('.carousel-list');
    var dateItem = document.querySelector('.date-item');

    var listPosition = parseFloat(window.getComputedStyle(datesList).getPropertyValue("left"));
    var dateItemWidth = parseFloat(window.getComputedStyle(dateItem).getPropertyValue("width"));

    if (direction == 'forward') {
      listPosition = listPosition - dateItemWidth;
    } else {
      //listPosition = listPosition + dateItemWidth;
    }

    (datesList as HTMLElement).style.left = (listPosition) + 'px';
    var sizeOfList = this.visibleDates.length;

    if (direction == 'forward') {
      this.visibleDates[sizeOfList] = Object.assign({}, this.visibleDates[sizeOfList - 1]);

      this.visibleDates[sizeOfList].date = new Date(this.visibleDates[sizeOfList - 1].date.setDate(this.visibleDates[sizeOfList - 1].date.getDate() + 1));
    } else {
      this.visibleDates.unshift(Object.assign({}, this.visibleDates[0]));
      this.visibleDates[0].date = new Date(this.visibleDates[1].date.setDate(this.visibleDates[1].date.getDate() - 1));
    }

    this.visibleDates[sizeOfList].index = sizeOfList;
    sizeOfList++;
  }

}