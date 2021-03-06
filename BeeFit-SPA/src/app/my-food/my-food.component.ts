import { Component, OnInit } from '@angular/core';
import { DishesService } from '../_services/dishes.service';
import { IngredientsService } from '../_services/ingredients.service';
import { UserService } from '../_services/user.service';
import { Dish } from '../_models/Dish';
import { Ingredient } from '../_models/Ingredient';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { PaginatedResult, Pagination } from '../_models/Pagination';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-food',
  templateUrl: './my-food.component.html',
  styleUrls: ['./my-food.component.css']
})
export class MyFoodComponent implements OnInit {
  userId: number;

  dishes$: Observable<PaginatedResult<Dish[]>>;
  dishes: Dish[];
  dishesPagination: Pagination;

  ingredients$: Observable<PaginatedResult<Ingredient[]>>;
  ingredients: Ingredient[];
  ingredientsPagination: Pagination;

  ingredient: Ingredient;
  pageNumber = 1;
  pageSize = 10;

  infoTextNutrients = 'Nutrients are provided for the quantity displayed.';

  constructor(private dishesService: DishesService,
              private ingredientsService: IngredientsService,
              private alertify: AlertifyService,
              public router: Router) {
                this.userId = +localStorage.getItem('userId');
              }

  ngOnInit() {
    this.getDishes();
    this.getIngredients();

    this.ingredientsService.currentIngredient.subscribe(ingredient => this.ingredient = ingredient);
  }

  getDishes() {
    this.dishesService.getDishes({
      pageNumber: this.dishesPagination ? this.dishesPagination.currentPage : this.pageNumber,
      pageSize: this.dishesPagination ? this.dishesPagination.itemsPerPage : this.pageSize,
      userId: this.userId, name: ''
    }).subscribe((res: PaginatedResult<Dish[]>) => {
        this.dishes = res.result;

        this.dishes.forEach(item => {
          item.weight = 0;
          item.ingredients.forEach(element => {
            item.weight += element.quantity;
          });
        });

        this.dishesPagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      }
    );
  }

  getIngredients() {
    this.ingredientsService.getIngredients(
      { pageNumber: this.ingredientsPagination ? this.ingredientsPagination.currentPage : this.pageNumber,
      pageSize: this.ingredientsPagination ? this.ingredientsPagination.itemsPerPage : this.pageSize,
      userId: this.userId, name: '' }
    ).subscribe(
      (res: PaginatedResult<Ingredient[]>) => {
        this.ingredients = res.result;
        this.ingredients.forEach(item => {
          item.callories = this.round(item.callories, item.gramsPerUnit);
          item.proteins = this.round(item.proteins, item.gramsPerUnit);
          item.fats = this.round(item.fats, item.gramsPerUnit);
          item.carbohydrates = this.round(item.carbohydrates, item.gramsPerUnit);
        });
        this.ingredientsPagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      }
    );
  }

  onDishDeleted() {
    this.getDishes();
  }

  onIngredientDeleted() {
    this.getIngredients();
  }

  round(nutrient: number, quantity: number): number {
    return Math.round(((nutrient / 100) * quantity) * 100) / 100;
  }

  dishesPageChanged($event: any) {
    this.dishesPagination.currentPage = $event.page;
    this.getDishes();
  }

  ingredientsPageChanged($event: any) {
    this.ingredientsPagination.currentPage = $event.page;
    this.getIngredients();
  }
}
