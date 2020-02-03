import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DateService } from '../_services/date.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  now: Date;
  selectedDate: Date;
  @Output() selectedDateEmitter = new EventEmitter<Date>();
  visibleDates: Array<{ date: Date, index: number }> = [];
  subscribedParam = 'initial value';
  DateFromRoute: string[];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private dateService: DateService) {

    this.route.paramMap.subscribe(paramMap =>
      this.DateFromRoute = paramMap.get('date').split('.'));
    if (this.DateFromRoute[2]) {
        this.selectedDate = new Date(parseFloat(this.DateFromRoute[2]), parseFloat(this.DateFromRoute[1]), parseFloat(this.DateFromRoute[0]));
        this.dateService.currentDate.subscribe(date => { this.now = date; this.selectedDate = this.selectedDate; });
      } else {
        this.dateService.currentDate.subscribe(date => { this.now = date; this.selectedDate = date; });
      }
    this.selectedDateEmitter.emit(this.selectedDate);
    this.prepareWeek();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  let dateItem = document.querySelectorAll('.date-item') ;
  (dateItem as any as Array<HTMLElement>).forEach(function(item, index) {
      item.style.order = (index + 1).toString();
    });
  }

  prepareWeek() {
    // const weekDaySelected = this.selectedDate.getDay();
    for (let i = 1, j = -3; i <= 7; i++, j++) {
      // const weekDay = weekDaySelected - i; 
      this.visibleDates[i - 1] = { date: new Date(), index: i - 1 };
     // this.visibleDates[i - 1].date.setDate(this.selectedDate.getDate() - weekDay - 1);
      this.visibleDates[i - 1].date.setDate(this.selectedDate.getDate() + j);
      this.visibleDates[i - 1].date.setMonth(this.selectedDate.getMonth());
      this.visibleDates[i - 1].date.setFullYear(this.selectedDate.getFullYear());
    }
  }

  slideDate(direction: string) {
    if (direction === 'forward') {
      this.visibleDates.forEach(function(item, index, arr){
        arr[index].date = new Date(arr[index].date.setDate(arr[index].date.getDate() + 1));
      });
    } else {
      this.visibleDates.forEach(function(item, index, arr) {
        arr[index].date = new Date(arr[index].date.setDate(arr[index].date.getDate() - 1));
      });
    }
  }

  emitDate(date: Date) {
    this.selectedDate = date;
    this.selectedDateEmitter.emit(date);
    this.router.navigate(['/days-plan', this.selectedDate.toLocaleDateString()]);
  }
}
