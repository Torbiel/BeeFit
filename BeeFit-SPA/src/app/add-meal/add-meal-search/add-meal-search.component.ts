import { Component, OnInit, Input } from '@angular/core';
import { DishesService } from 'src/app/_services/dishes.service';
import { Dish } from 'src/app/_models/Dish';
import { Ingredient } from 'src/app/_models/Ingredient';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { IngredientsService } from 'src/app/_services/ingredients.service';
import { MealService } from 'src/app/_services/meal.service';
import { Meal } from 'src/app/_models/Meal';
import { User } from 'src/app/_models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { MealtypeService } from 'src/app/_services/mealtype.service';

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
  @Input() userId: number;
  mealType: number;
  route: ActivatedRoute;

  constructor(private dishesService: DishesService,
              private alertify: AlertifyService,
              private ingredientsService: IngredientsService,
              private mealService: MealService,
              public router: Router,
              private mealTypeService: MealtypeService) { }

  ngOnInit() {
    this.mealTypeService.currentMealType.subscribe(mealtype => this.mealType = mealtype);
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

  addToMeal(dishId: number, ingredientId: number) {
    this.meal = new Meal();
    this.meal.type = this.mealType;
    this.meal.date = new Date();
    this.meal.userId = this.userId;
    this.meal.dishId = dishId;
    this.meal.ingredientId = ingredientId;

    this.mealService.add(this.meal).subscribe(() => {
      this.alertify.success('Meal added.');
      this.router.navigate(['/todays-plan']);
    }, error => {
      this.alertify.error(error);
    });
  }
}
