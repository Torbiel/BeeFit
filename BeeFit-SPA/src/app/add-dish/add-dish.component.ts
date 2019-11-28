import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IngredientsService } from '../_services/ingredients.service';
import { Subject, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from 'rxjs/operators';
import { Ingredient } from '../_models/Ingredient';
import { Dish } from '../_models/Dish';
import { DishesService } from '../_services/dishes.service';
import { DishesIngredient } from '../_models/DishesIngredient';
import { AlertifyService } from '../_services/alertify.service';
import { MealtypeService } from '../_services/mealtype.service';
import { DateService } from '../_services/date.service';
import { Meal } from '../_models/Meal';
import { PaginatedResult } from '../_models/Pagination';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  ingredients$: Observable<PaginatedResult<Ingredient[]>>;
  private ingredientSearchName = new Subject<string>();
  addedIngredients = new Array<DishesIngredient>();
  dish = new Dish();
  userId: number;
  pageNumber = 1;
  pageSize = 10;

  constructor(
    public router: Router,
    private ingredientsService: IngredientsService,
    private dishesService: DishesService,
    private alertify: AlertifyService) {}

  ngOnInit() {
    this.userId = +localStorage.getItem('userId');

    this.ingredients$ = this.ingredientSearchName.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.ingredientsService.getIngredientsByName(name, this.pageNumber, this.pageSize))
    );
  }

  findIngredients(name: string) {
    this.ingredientSearchName.next(name);
  }

  setDishName(name: string) {
    this.dish.name = name;
  }

  addToDish(ing: Ingredient) {
    this.alertify.prompt(
      'Provide quantity of the ingredient in grams:',
      (value: any, event: any) => {
        const dishesIngredient = new DishesIngredient();
        dishesIngredient.ingredient = ing;
        dishesIngredient.ingredientId = ing.id;
        dishesIngredient.quantity = value;
        this.addedIngredients.push(dishesIngredient);
      }
    );
  }

  deleteFromDish(ing: DishesIngredient) {
    const index = this.addedIngredients.indexOf(ing);
    this.addedIngredients.splice(index, 1);
  }

  addDish() {
    this.dish.ingredients = new Array<DishesIngredient>();
    this.addedIngredients.forEach(item => {
      this.dish.ingredients.push(item);
    });

    this.dishesService.add(this.dish).subscribe(
      () => {
        this.alertify.success('Dish added.');
        this.router.navigate(['/my-food']);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
}
