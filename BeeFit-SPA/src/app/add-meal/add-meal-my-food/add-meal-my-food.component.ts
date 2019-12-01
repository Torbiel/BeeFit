import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/_models/User';
import { Router } from '@angular/router';
import { DishesService } from 'src/app/_services/dishes.service';
import { IngredientsService } from 'src/app/_services/ingredients.service';
import { Dish } from 'src/app/_models/Dish';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Ingredient } from 'src/app/_models/Ingredient';
import { Meal } from 'src/app/_models/Meal';
import { MealtypeService } from 'src/app/_services/mealtype.service';
import { MealService } from 'src/app/_services/meal.service';
import { PaginatedResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-add-meal-my-food',
  templateUrl: './add-meal-my-food.component.html',
  styleUrls: ['./add-meal-my-food.component.css']
})
export class AddMealMyFoodComponent implements OnInit {
  @Input() userId: number;
  @Output() addMode = new EventEmitter<boolean>();
  dishes: PaginatedResult<Dish[]>;
  ingredients: PaginatedResult<Ingredient[]>;
  meal: Meal;
  mealType: number;
  pageNumber = 1;
  pageSize = 10;

  constructor(public router: Router,
              private dishesService: DishesService,
              private ingredientsService: IngredientsService,
              private alertify: AlertifyService,
              private mealTypeService: MealtypeService,
              private mealService: MealService) { }

  ngOnInit() {
    this.getDishes();
    this.getIngredients();
    this.mealTypeService.currentMealType.subscribe(mealtype => this.mealType = mealtype);
  }

  getDishes() {
    this.dishesService.getDishes(null, this.userId, this.pageNumber, this.pageSize).subscribe((dishes: PaginatedResult<Dish[]>) => {
      this.dishes = dishes;
    }, error => {
      this.alertify.error(error);
    });
  }

  getIngredients() {
    this.ingredientsService.getIngredientsByUserId(this.userId).subscribe((ingredients: PaginatedResult<Ingredient[]>) => {
      this.ingredients = ingredients;
    }, error => {
      this.alertify.error(error);
    });
  }

  addToMeal(dishId: number, ingredientId: number) {
    this.meal = new Meal();
    this.meal.type = this.mealType;
    this.meal.date = new Date();
    this.meal.userId = this.userId;
    this.meal.dishId = dishId;
    this.meal.ingredientId = ingredientId;

    this.mealService.add(this.meal).subscribe(() => {
      this.alertify.success('Meal added.');
      this.addMode.emit(false);
    }, error => {
      this.alertify.error(error);
    });
  }
}
