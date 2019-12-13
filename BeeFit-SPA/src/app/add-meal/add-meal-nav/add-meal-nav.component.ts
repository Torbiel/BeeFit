import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DishesService } from 'src/app/_services/dishes.service';
import { IngredientsService } from 'src/app/_services/ingredients.service';
import { MealService } from 'src/app/_services/meal.service';
import { Router } from '@angular/router';
import { MealtypeService } from 'src/app/_services/mealtype.service';
import { DateService } from 'src/app/_services/date.service';
import { Observable } from 'rxjs';
import { PaginatedResult, Pagination } from 'src/app/_models/Pagination';
import { Ingredient } from 'src/app/_models/Ingredient';
import { Dish } from 'src/app/_models/Dish';
import { Meal } from 'src/app/_models/Meal';
import { MatExpansionModule } from '@angular/material';
import { FoodSearchParams } from 'src/app/_models/FoodSearchParams';

@Component({
  selector: 'app-add-meal-nav',
  templateUrl: './add-meal-nav.component.html',
  styleUrls: ['./add-meal-nav.component.css']
})
export class AddMealNavComponent implements OnInit {
  mealType: number;
  meal: Meal;
  user$: Observable<User>;
  user: User;
  currentDate: Date;
  @Output() addMode = new EventEmitter<boolean>();

  dishesPagination: Pagination;
  dishes$: Observable<PaginatedResult<Dish[]>>;
  dishes: Dish[];

  ingredientsPagination: Pagination;
  ingredients$: Observable<PaginatedResult<Ingredient[]>>;
  ingredients: Ingredient[];

  filterParams: FoodSearchParams;
  paginationParams: any = {};

  infoText = `Nutrients for ingredients are provided per 100g/100ml and for dishes per one portion.
              E = Energy, P = Proteins, F = Fats, C = Carbohydrates`;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private dishesService: DishesService,
    private ingredientsService: IngredientsService,
    private mealService: MealService,
    public router: Router,
    private mealTypeService: MealtypeService,
    private dateService: DateService) {
      this.getUser();
  }

  ngOnInit() {
    this.mealTypeService.currentMealType.subscribe(
      mealtype => (this.mealType = mealtype)
    );
    this.dateService.currentDate.subscribe(date => (this.currentDate = date));

    this.paginationParams.pageNumber = 1;
    this.paginationParams.pageSize = 10;
  }

  getUser() {
    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe(
      (user: User) => {
        this.user = user;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  findDishes() {
    if (this.dishesPagination) {
      this.paginationParams.pageNumber = this.dishesPagination.currentPage;
      this.paginationParams.pageSize = this.dishesPagination.itemsPerPage;
    }

    if (this.filterParams.name  !== '') {
      this.dishesService.getDishes({ ...this.paginationParams, ...this.filterParams }).subscribe((res: PaginatedResult<Dish[]>) => {
        this.dishes = res.result;
        this.dishesPagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  findIngredients() {
    if (this.ingredientsPagination) {
      this.paginationParams.pageNumber = this.ingredientsPagination.currentPage;
      this.paginationParams.pageSize = this.ingredientsPagination.itemsPerPage;
    }

    if (this.filterParams.name !== '') {
      this.ingredientsService.getIngredients({ ...this.paginationParams, ...this.filterParams })
        .subscribe((res: PaginatedResult<Ingredient[]>) => {
          this.ingredients = res.result;
          this.ingredientsPagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
    }
  }

  addToMeal(dishId: number, ingredientId: number) {
    this.meal = new Meal();
    this.meal.type = this.mealType;
    this.meal.date = this.currentDate;
    this.meal.userId = this.user.id;
    this.meal.dishId = dishId;
    this.meal.ingredientId = ingredientId;

    this.mealService.add(this.meal).subscribe(
      () => {
        this.alertify.success('Meal added.');
        this.addMode.emit(false);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  dishesPageChanged(event: any) {
    this.dishesPagination.currentPage = event.page;
    this.findDishes();
  }

  ingredientsPageChanged(event: any) {
    this.ingredientsPagination.currentPage = event.page;
    this.findIngredients();
  }

  resetPagination() {
    if (this.dishesPagination) {
      this.dishesPagination.currentPage = 1;
    }

    if (this.ingredientsPagination) {
      this.ingredientsPagination.currentPage = 1;
    }
  }

  onSearched(event: any) {
    this.filterParams = event;
    this.resetPagination();
    this.findDishes();
    this.findIngredients();
  }

  onFiltersApplied(event: any) {
    this.filterParams = event;
    this.dishesPagination.currentPage = 1;
    this.ingredientsPagination.currentPage = 1;
    this.findDishes();
    this.findIngredients();
  }

  onFiltersReset(event: any) {
    this.filterParams = event;

    if (this.filterParams.name.replace(/\s/g, '').length > 0) {
      this.resetPagination();
      this.findDishes();
      this.findIngredients();
    }
  }
}

// find(name: string) {
  //   this.filterParams.name = name;
  //   const d = this.dishesService.getDishes(this.paginationParams, this.filterParams).pipe(map(val => val.result));
  //   const i = this.ingredientsService.getIngredients(this.paginationParams, this.filterParams).pipe(map(val => val.result));

  //   forkJoin([d, i])
  //   .pipe(map(data => data.reduce((result, arr) => [...result, ...arr], [])))
  //   .subscribe(data => {
  //     this.searchResults = data;
  //     this.searchResults$ = new PaginatedResult<Dish[] | Ingredient[]>(data);
  //     this.searchResults$.pagination = new Pagination();
  //     this.searchResults$.pagination.totalItems = this.searchResults.length;
  //     this.searchResults$.pagination.currentPage = 1;
  //     this.searchResults$.pagination.itemsPerPage = 10;
  //     this.searchResults$.pagination.totalPages = Math.ceil(this.searchResults.length / this.searchResults$.pagination.itemsPerPage);
  //     this.searchResults$.result = this.searchResults;
  //   });
  // }
