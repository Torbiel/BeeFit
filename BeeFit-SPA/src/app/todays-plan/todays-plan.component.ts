import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/User';
import { MealService } from '../_services/meal.service';
import { Meal } from '../_models/Meal';

@Component({
  selector: 'app-todays-plan',
  templateUrl: './todays-plan.component.html',
  styleUrls: ['./todays-plan.component.css']
})
export class TodaysPlanComponent implements OnInit {
  user: User;
  meals: Meal[];

  constructor(private userService: UserService, private alertify: AlertifyService, private mealService: MealService) {

  }


  ngOnInit() {
    this.getUser();
    this.getMeals();
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

  prepareDatePicker() {
    const today = new Date();
  }
}
