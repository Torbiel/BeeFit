import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../_models/Ingredient';
import { DishesIngredient } from '../_models/DishesIngredient';
import { Dish } from '../_models/Dish';
import { Router, ActivatedRoute } from '@angular/router';
import { IngredientsService } from '../_services/ingredients.service';
import { DishesService } from '../_services/dishes.service';
import { AlertifyService } from '../_services/alertify.service';
import { switchMap } from 'rxjs/operators';
import { PaginatedResult, Pagination } from '../_models/Pagination';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {
  addedIngredients = new Array<DishesIngredient>();
  dish$: Observable<Dish>;
  dishId: number;
  dish = new Dish();

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
    public router: Router,
    private ingredientsService: IngredientsService,
    private dishesService: DishesService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) {
      this.userId = +localStorage.getItem('userId');
    }

  ngOnInit() {
    this.dish$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.dishId = +params.get('id');
        return this.dishesService.getById(this.dishId);
      }
    ));

    this.dish$.subscribe(
      (dish) => {
        this.dish  = dish;
        this.addedIngredients = this.dish.ingredients;
        this.addedIngredients.forEach(item => {
          item.ingredientId = item.ingredient.id;
        });
      }, error => {
        this.alertify.error(error);
      }
    );

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

  setDishName(name: string) {
    this.dish.name = name;
  }

  addToDish(ing: Ingredient) {
    this.alertify.prompt(
      'Provide quantity of the ingredient:',
      (value: any, event: any) => {
        if (value <= 0 || isNaN(value)) {
          return this.alertify.error('Quantity must bea number greater than 0.');
        }

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

  updateDish() {
    if (this.dish.name === '' || this.dish.name == null) {
      return this.alertify.error('Name your dish.');
    }

    this.dish.ingredients = new Array<DishesIngredient>();
    this.addedIngredients.forEach(item => {
      this.dish.ingredients.push(item);
    });

    this.calculateNutrients();

    this.dishesService.update(this.dishId, this.dish).subscribe(
      () => {
        this.alertify.success('Dish updated.');
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
      this.dish.callories += this.round(element.ingredient.callories, element.quantity);
      this.dish.proteins += this.round(element.ingredient.proteins, element.quantity);
      this.dish.fats += this.round(element.ingredient.fats, element.quantity);
      this.dish.carbohydrates += this.round(element.ingredient.carbohydrates, element.quantity);
    });
  }

  round(nutrient: number, quantity: number): number {
    return Math.round(((nutrient / 100) * quantity) * 100) / 100;
  }

  ingredientsPageChanged(event: any) {
    this.ingredientsPagination.currentPage = event.page;
    this.findIngredients();
  }

  cancelEdit() {
    this.router.navigate(['/my-food']);
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
