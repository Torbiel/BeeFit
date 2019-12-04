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
import { PaginatedResult, Pagination } from '../_models/Pagination';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  ingredients$: Observable<PaginatedResult<Ingredient[]>>;
  ingredients: Ingredient[];
  ingredientsPagination: Pagination;
  addedIngredients = new Array<DishesIngredient>();

  dish = new Dish();
  userId: number;

  filterParams: any = {};
  paginationParams: any = {};

  constructor(
    public router: Router,
    private ingredientsService: IngredientsService,
    private dishesService: DishesService,
    private alertify: AlertifyService) {
      this.userId = +localStorage.getItem('userId');
    }

  ngOnInit() {
    this.paginationParams.pageNumber = 1;
    this.paginationParams.pageSize = 10;

    this.filterParams.userId = null;
    this.filterParams.minCallories = null;
    this.filterParams.maxCallories = null;
  }

  findIngredients() {
    if (this.ingredientsPagination) {
      this.paginationParams.pageNumber = this.ingredientsPagination.currentPage;
      this.filterParams.pageSize = this.ingredientsPagination.itemsPerPage;
    }

    if (this.filterParams.name !== '') {
      this.ingredientsService.getIngredients(this.paginationParams, this.filterParams).subscribe((res: PaginatedResult<Ingredient[]>) => {
        this.ingredients = res.result;
        this.ingredientsPagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  addToDish(ing: Ingredient) {
    this.alertify.prompt(
      'Provide quantity of the ingredient in g or ml:',
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

    this.calculateNutrients();

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

  calculateNutrients() {
    this.dish.callories = 0;
    this.dish.proteins = 0;
    this.dish.fats = 0;
    this.dish.carbohydrates = 0;

    this.dish.ingredients.forEach(element => {
      this.dish.callories += (element.ingredient.callories / 100) * element.quantity;
      this.dish.proteins += (element.ingredient.proteins / 100) * element.quantity;
      this.dish.fats += (element.ingredient.fats / 100) * element.quantity;
      this.dish.carbohydrates += (element.ingredient.carbohydrates / 100) * element.quantity;
    });
  }

  resetPagination() {
    if (this.ingredientsPagination) {
      this.ingredientsPagination.currentPage = 1;
    }
  }

  onSearched(event: any) {
    this.filterParams = event;
    this.resetPagination();
    this.findIngredients();
  }

  onFiltersApplied(event: any) {
    this.filterParams = event;
    this.ingredientsPagination.currentPage = 1;
    this.findIngredients();
  }

  onFiltersReset(event: any) {
    this.filterParams = event;
    this.resetPagination();
    this.findIngredients();
  }
}
