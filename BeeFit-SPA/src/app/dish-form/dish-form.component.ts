import { Component, OnInit } from '@angular/core';
import { DishesIngredient } from '../_models/DishesIngredient';
import { Dish } from '../_models/Dish';
import { Observable } from 'rxjs';
import { PaginatedResult, Pagination } from '../_models/Pagination';
import { Ingredient } from '../_models/Ingredient';
import { IngredientsService } from '../_services/ingredients.service';
import { DishesService } from '../_services/dishes.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent implements OnInit {
  dish$: Observable<Dish>;
  dishId: number;
  dish: Dish;

  userId: number;

  ingredients$: Observable<PaginatedResult<Ingredient[]>>;
  ingredientsPagination: Pagination;
  ingredients: Ingredient[];

  filterParams: any = {};
  paginationParams: any = {};

  infoTextSearch = 'Nutrients are provided per 100g/100ml.';
  infoTextAdded = 'Nutrients are provided for quantity entered.';
  infoTextDish = 'Please add ingredients necessary for 1 portion.';

  constructor(
    private ingredientsService: IngredientsService,
    private dishesService: DishesService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.paginationParams.pageNumber = 1;
    this.paginationParams.pageSize = 10;
    this.dish = new Dish();
    this.dish.ingredients = new Array<DishesIngredient>();
  }

  ngOnInit() {
    this.userId = +localStorage.getItem('userId');

    this.dish$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.dishId = +params.get('id');
        return this.dishesService.getById(this.dishId);
      }
    ));

    if (this.route.snapshot.paramMap.get('id')) {
      this.dish$.subscribe(
        (dish) => {
          this.dish = dish;
        }, error => {
          this.alertify.error(error);
        }
      );
    }
  }

  findIngredients() {
    if (this.ingredientsPagination) {
      this.paginationParams.pageNumber = this.ingredientsPagination.currentPage;
      this.filterParams.pageSize = this.ingredientsPagination.itemsPerPage;
    }

    if (this.filterParams.name !== '') {
      this.ingredientsService
        .getIngredients({ ...this.paginationParams, ...this.filterParams })
        .subscribe(
          (res: PaginatedResult<Ingredient[]>) => {
            this.ingredients = res.result;
            this.ingredientsPagination = res.pagination;
          },
          error => {
            this.alertify.error(error);
          }
        );
    }
  }

  addToDish(ing: Ingredient) {
    this.alertify.prompt(
      'Provide quantity of the ingredient:',
      (value: any, event: any) => {
        if (value <= 0 || isNaN(value)) {
          return this.alertify.error(
            'Quantity must be a number greater than 0.'
          );
        }

        const dishesIngredient = new DishesIngredient();
        dishesIngredient.ingredient = ing;
        dishesIngredient.ingredientId = ing.id;
        dishesIngredient.quantity = value;
        this.dish.ingredients.push(dishesIngredient);
        this.calculateNutrients();
      }
    );
  }

  deleteFromDish(ing: DishesIngredient) {
    const index = this.dish.ingredients.indexOf(ing);
    this.dish.ingredients.splice(index, 1);
    this.calculateNutrients();
  }

  upsertDish() {
    if (! this.validateDishName()) {
      return;
    }

    this.calculateNutrients();
    this.dish.userId = this.userId;

    if (this.dish.id === undefined) {
      // Nullifying the ingredients, so they won't be added to db
      // this.dish.ingredients.forEach(item => {
      //   item.ingredientId = item.ingredient.id;
      //   item.ingredient = null;
      // });

      this.dishesService.add(this.dish).subscribe(
        () => this.dishSaved(),
        error => {
          this.alertify.error(error);
        }
      );
    } else {
      this.dish.id = this.dishId;

      this.dishesService.update(this.dish.id, this.dish).subscribe(
        () => this.dishSaved(),
        error => {
          this.alertify.error(error);
        }
      );
    }
  }

  validateDishName() {
    if (this.dish.name === '' || this.dish.name == null || this.dish.name === undefined) {
      this.alertify.error('Name your dish.');
      return false;
    }

    return true;
  }

  dishSaved() {
    this.alertify.success('Dish saved.');
    this.router.navigate(['/my-food']).then(() => window.location.reload());
  }

  calculateNutrients() {
    this.dish.callories = 0;
    this.dish.proteins = 0;
    this.dish.fats = 0;
    this.dish.carbohydrates = 0;

    this.dish.ingredients.forEach(element => {
      this.dish.callories += this.round(
        element.ingredient.callories,
        element.quantity
      );
      this.dish.proteins += this.round(
        element.ingredient.proteins,
        element.quantity
      );
      this.dish.fats += this.round(element.ingredient.fats, element.quantity);
      this.dish.carbohydrates += this.round(
        element.ingredient.carbohydrates,
        element.quantity
      );
    });
  }

  round(nutrient: number, quantity: number): number {
    return Math.round((nutrient / 100) * quantity * 100) / 100;
  }

  resetPagination() {
    if (this.ingredientsPagination) {
      this.ingredientsPagination.currentPage = 1;
    }
  }

  // event handlers
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
