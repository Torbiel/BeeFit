import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/User';
import { MealService } from '../_services/meal.service';
import { Meal } from '../_models/Meal';
import { Router } from '@angular/router';
import { MealtypeService } from '../_services/mealtype.service';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DateService } from '../_services/date.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todays-plan',
  templateUrl: './todays-plan.component.html',
  styleUrls: ['./todays-plan.component.css']
})
export class TodaysPlanComponent implements OnInit {
  user: User;
  meals: Meal[];
  mealType: number;
  mealTypes = [
    'Breakfast',
    'Second breakfast',
    'Lunch',
    'Dinner',
    'Snack',
    'Supper',
    'Training'
  ];
  filteredMeals: Meal[][];
  currentDate: Date;
  addMode = false;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private mealService: MealService,
    public router: Router,
    private mealTypeService: MealtypeService,
    private dateService: DateService
  ) {}

  ngOnInit() {
    this.getUser();
    this.currentDate = new Date();
    this.getMeals(this.currentDate);
    this.mealTypeService.currentMealType.subscribe(
      mealtype => (this.mealType = mealtype)
    );
    this.dateService.currentDate.subscribe(
      date => (this.currentDate = date)
    );
  }

  getUser() {
    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe(
      (user: User) => {
        this.user = user;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  getMeals(date: Date) {
    this.mealService.getManyByDate(date).subscribe(
      (meals: Meal[]) => {
        this.meals = meals;
        this.filterMealsByType();
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  filterMealsByType() {
    this.filteredMeals = [];
    for (let i = 0; i < this.mealTypes.length; i++) {
      this.filteredMeals[i] = [];
      const oneTypeMeals = this.meals.filter(meal => meal.type === i);
      this.filteredMeals[i] = oneTypeMeals;
    }
  }

  setMealType(mealtype: number) {
    this.mealTypeService.changeMealType(mealtype);
  }

  setDate() {
    this.dateService.changeDate(this.currentDate);
  }

  toggleAddModeFromButton() {
    this.addMode = true;
    window.scrollTo(0, 0);
  }

  toggleAddMode() {
    this.addMode = !this.addMode;
    this.getMeals(this.currentDate);
  }

  deleteMeal(meal: Meal) {
    this.mealService.delete(meal.id).subscribe(
      () => {
        this.alertify.success('Meal deleted.');
        this.getMeals(this.currentDate);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  onDateSelected(date: Date) {
    this.currentDate = date;
    this.getMeals(date);
  }
}
