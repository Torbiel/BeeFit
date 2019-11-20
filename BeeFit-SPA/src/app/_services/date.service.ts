import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private dateSource = new BehaviorSubject(new Date());
  currentDate = this.dateSource.asObservable();

  constructor() { }

  changeDate(date: Date) {
    this.dateSource.next(date);
  }
}
