import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IngredientsService } from '../_services/ingredients.service';
import { Observable } from 'rxjs';
import { Ingredient } from '../_models/Ingredient';
import { Dish } from '../_models/Dish';
import { DishesService } from '../_services/dishes.service';
import { DishesIngredient } from '../_models/DishesIngredient';
import { AlertifyService } from '../_services/alertify.service';
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

  infoTextSearch = 'Nutrients are provided per 100g/100ml.';
  infoTextAdded = 'Nutrients are provided for quantity entered.';
  infoTextDish = 'Please add ingredients necessary for 1 portion.';

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
  }

  findIngredients() {
    if (this.ingredientsPagination) {
      this.paginationParams.pageNumber = this.ingredientsPagination.currentPage;
      this.filterParams.pageSize = this.ingredientsPagination.itemsPerPage;
    }

    if (this.filterParams.name !== '') {
      this.ingredientsService.getIngredients({...this.paginationParams, ...this.filterParams})
        .subscribe((res: PaginatedResult<Ingredient[]>) => {
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
        if (value <= 0 || isNaN(value)) {
          return this.alertify.error('Quantity must bea number greater than 0.');
        }

        const dishesIngredient = new DishesIngredient();
        dishesIngredient.ingredient = ing;
        dishesIngredient.ingredientId = ing.id;
        dishesIngredient.quantity = value;
        this.addedIngredients.push(dishesIngredient);
        this.calculateNutrients();
      }
    );
  }

  // $('#alertify-text').replaceWith('<input type="password" id="alertify-text" class="alertify-text"/>');

  deleteFromDish(ing: DishesIngredient) {
    const index = this.addedIngredients.indexOf(ing);
    this.addedIngredients.splice(index, 1);
    this.calculateNutrients();
  }

  addDish() {
    if (this.dish.name === '' || this.dish.name == null) {
      return this.alertify.error('Name your dish.');
    }

    this.dish.ingredients = new Array<DishesIngredient>();
    this.addedIngredients.forEach(item => {
      this.dish.ingredients.push(item);
    });

    this.calculateNutrients();

    this.addedIngredients.forEach(item => {
      item.ingredientId = item.ingredient.id;
      item.ingredient = null;
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

  calculateNutrients() {
    this.dish.callories = 0;
    this.dish.proteins = 0;
    this.dish.fats = 0;
    this.dish.carbohydrates = 0;

    this.addedIngredients.forEach(element => {
      this.dish.callories += this.round(element.ingredient.callories, element.quantity);
      this.dish.proteins += this.round(element.ingredient.proteins, element.quantity);
      this.dish.fats += this.round(element.ingredient.fats, element.quantity);
      this.dish.carbohydrates += this.round(element.ingredient.carbohydrates, element.quantity);
    });
  } 

  round(nutrient: number, quantity: number): number {
    return Math.round(((nutrient / 100) * quantity) * 100) / 100;
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
