import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/User';
import { MealService } from '../_services/meal.service';
import { Meal } from '../_models/Meal';
import { Router } from '@angular/router';
import { MealtypeService } from '../_services/mealtype.service';

@Component({
  selector: 'app-todays-plan',
  templateUrl: './todays-plan.component.html',
  styleUrls: ['./todays-plan.component.css']
})
export class TodaysPlanComponent implements OnInit {
  user: User;
  meals: Meal[];
  mealType: number;

  constructor(private userService: UserService,
              private alertify: AlertifyService,
              private mealService: MealService,
              public router: Router,
              private mealTypeService: MealtypeService) {

  }


  ngOnInit() {
    this.getUser();
    this.getMeals();
    this.mealTypeService.currentMealType.subscribe(mealtype => this.mealType = mealtype);
  }

  getUser() {
    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = user;
    }, error => {
      this.alertify.error(error);
    });
  }

  getMeals() {
    const date = new Date();
    this.mealService.getManyByDate(date).subscribe((meals: Meal[]) => {
      this.meals = meals;
    }, error => {
      this.alertify.error(error);
    });
  }

  filterMealsByType(meals: Meal[], type: number): Meal[] {
    return meals.filter(meal => meal.type === type);
  }

  setMealType(mealtype: number) {
    this.mealTypeService.changeMealType(mealtype);
  }

  deleteMeal(id: number) {
    this.mealService.delete(id).subscribe(() => {
      this.alertify.success('Meal deleted.');
      const mealToDeleteIndex = this.meals.indexOf(this.meals.find(meal => meal.id === id));
      if (mealToDeleteIndex !== -1) {
        this.meals.splice(mealToDeleteIndex, 1);
      }
    }, error => {
      this.alertify.error(error);
    });
  }

  prepareDatePicker() {
    const today = new Date();
  }
}
