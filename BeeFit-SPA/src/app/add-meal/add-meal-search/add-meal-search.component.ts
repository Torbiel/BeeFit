import { Component, OnInit } from '@angular/core';
import { DishesService } from 'src/app/_services/dishes.service';
import { Dish } from 'src/app/_models/Dish';
import { Ingredient } from 'src/app/_models/Ingredient';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { IngredientsService } from 'src/app/_services/ingredients.service';
import { MealService } from 'src/app/_services/meal.service';
import { Meal } from 'src/app/_models/Meal';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-meal-search',
  templateUrl: './add-meal-search.component.html',
  styleUrls: ['./add-meal-search.component.css']
})
export class AddMealSearchComponent implements OnInit {
  name: string;
  dishes: Dish[];
  ingredients: Ingredient[];
  meal: Meal;
  user: User;

  constructor(private dishesService: DishesService,
              private alertify: AlertifyService,
              private ingredientsService: IngredientsService,
              private mealService: MealService,
              private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe((user: User) => {
      console.log(user);
      this.user = user;
    }, error => {
      this.alertify.error(error);
    });
  }

  findDishes() {
    this.dishesService.getDishesByName(this.name).subscribe((dishes: Dish[]) => {
      this.dishes = dishes.map(d => Object.assign(new Dish(), d));
    }, error => {
      this.alertify.error(error);
    });
  }

  findIngredients() {
    this.ingredientsService.getIngredientsByName(this.name).subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    }, error => {
      this.alertify.error(error);
    });
  }

  addToMeal(dish: Dish, ingredient: Ingredient) {
    this.meal = new Meal();
    this.meal.type = 1;
    this.meal.date = new Date();
    this.meal.user = this.user;
    this.meal.dish = dish;
    this.meal.ingredient = ingredient;

    this.mealService.addMeal(this.meal);
  }
}
