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
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { PaginatedResult, Pagination } from 'src/app/_models/Pagination';
import { Ingredient } from 'src/app/_models/Ingredient';
import { Dish } from 'src/app/_models/Dish';
import { Meal } from 'src/app/_models/Meal';
import { MatExpansionModule } from '@angular/material';
import { map } from 'rxjs/operators';

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

  pagination: Pagination;
  searchResults$: Observable<PaginatedResult<Ingredient[] | Dish[]>>;
  searchResults: any;

  filterParams: any = {};
  paginationParams: any = {};

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

    this.filterParams.userId = null;
    this.filterParams.minCallories = null;
    this.filterParams.maxCallories = null;

    // this.searchResults = new Array<Ingredient | Dish>();
    this.pagination = new Pagination();
    this.pagination.totalItems = 0;
    this.pagination.currentPage = 1;
    this.pagination.itemsPerPage = 10;
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

  find(name: string) {
    this.filterParams.name = name;
    const d = this.dishesService.getDishes(this.paginationParams, this.filterParams).pipe(map(val => val.result));
    const i = this.ingredientsService.getIngredients(this.paginationParams, this.filterParams).pipe(map(val => val.result));

    forkJoin([d, i])
    .pipe(map(data => data.reduce((result, arr) => [...result, ...arr], [])))
    .subscribe(data => {
      this.searchResults = data;
      console.log(this.searchResults);
    });

    // const all = forkJoin(d, i).pipe(map([d, i, 1] => d.concat(in)));
    // const all = combineLatest(d, i).pipe(map(([di, in]) => di.concat(in)));
  }

  findDishes(name: string) {
    if (this.dishesPagination) {
      this.paginationParams.pageNumber = this.dishesPagination.currentPage;
      this.paginationParams.pageSize = this.dishesPagination.itemsPerPage;
    }

    if (name !== '') {
      this.filterParams.name = name;
      this.dishesService.getDishes(this.paginationParams, this.filterParams).subscribe((res: PaginatedResult<Dish[]>) => {
        // this.dishes = res.result;
        this.searchResults.concat(res.result);
        // this.dishesPagination = res.pagination;
        this.pagination.totalItems += res.result.length;
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  findIngredients(name: string) {
    if (this.ingredientsPagination) {
      this.paginationParams.pageNumber = this.ingredientsPagination.currentPage;
      this.filterParams.pageSize = this.ingredientsPagination.itemsPerPage;
    }

    if (name !== '') {
      this.filterParams.name = name;
      this.ingredientsService.getIngredients(this.paginationParams, this.filterParams).subscribe((res: PaginatedResult<Ingredient[]>) => {
        // this.ingredients = res.result;
        // this.ingredientsPagination = res.pagination;
        this.searchResults.concat(res.result);
        this.pagination.totalItems += res.result.length;
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

  pageChanged(event: any, name: string) {
    this.pagination.currentPage = event.page;
    this.find
  }

  dishesPageChanged(event: any, name: string) {
    this.dishesPagination.currentPage = event.page;
    this.findDishes(name);
  }

  ingredientsPageChanged(event: any, name: string) {
    this.ingredientsPagination.currentPage = event.page;
    this.findIngredients(name);
  }

  applyFilters(name: string) {
    this.dishesPagination.currentPage = 1;
    this.ingredientsPagination.currentPage = 1;
    this.findDishes(name);
    this.findIngredients(name);
  }

  resetFilters(name: string) {
    this.resetPagination();
    this.filterParams.userId = null;
    this.filterParams.minCallories = null;
    this.filterParams.maxCallories = null;
    this.findDishes(name);
    this.findIngredients(name);
  }

  resetPagination() {
    if (this.dishesPagination) {
      this.dishesPagination.currentPage = 1;
    }

    if (this.ingredientsPagination) {
      this.ingredientsPagination.currentPage = 1;
    }

    if(this.pagination) {
      this.pagination.currentPage = 1;
    }
  }
}
