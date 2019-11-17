import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealtypeService {
  private mealTypeSource = new BehaviorSubject(0);
  currentMealType = this.mealTypeSource.asObservable();

  constructor() { }

  changeMealType(mealType: number) {
    this.mealTypeSource.next(mealType);
  }

}
