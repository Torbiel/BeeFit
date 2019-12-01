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
import { Subject, Observable } from 'rxjs';
import { PaginatedResult, Pagination } from 'src/app/_models/Pagination';
import { Ingredient } from 'src/app/_models/Ingredient';
import { Dish } from 'src/app/_models/Dish';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Meal } from 'src/app/_models/Meal';
import { MatExpansionModule } from '@angular/material';
import { DefaultValuePipe } from '../../_pipes/defaultValue.pipe';

@Component({
  selector: 'app-add-meal-nav',
  templateUrl: './add-meal-nav.component.html',
  styleUrls: ['./add-meal-nav.component.css']
})
export class AddMealNavComponent implements OnInit {
  pipes: [DefaultValuePipe];
  mealType: number;
  meal: Meal;
  user: User;
  userId: number; // For Http requests purposes
  currentDate: Date;
  private dishesSearchName = new Subject<string>();
  private ingredientsSearchName = new Subject<string>();
  ingredients$: Observable<PaginatedResult<Ingredient[]>>;
  dishes$: Observable<PaginatedResult<Dish[]>>;
  dishes: Dish[];
  pageNumber = 1;
  pageSize = 10;
  @Output() addMode = new EventEmitter<boolean>();
  dishesPagination: Pagination;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private dishesService: DishesService,
    private ingredientsService: IngredientsService,
    private mealService: MealService,
    public router: Router,
    private mealTypeService: MealtypeService,
    private dateService: DateService
  ) {
    this.getUser();
  }

  ngOnInit() {
    this.mealTypeService.currentMealType.subscribe(
      mealtype => (this.mealType = mealtype)
    );
    this.dateService.currentDate.subscribe(date => (this.currentDate = date));

    // this.ingredients$ = this.ingredientsSearchName.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((name: string) =>
    //     this.ingredientsService.getIngredientsByName(
    //       name,
    //       this.pageNumber,
    //       this.pageSize
    //     )
    //   )
    // );

    // this.dishes$ = this.dishesSearchName.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((name: string) =>
    //     this.dishesService.getDishes(
    //       name,
    //       this.userId,
    //       this.dishesPagination ? this.dishesPagination.currentPage : this.pageNumber,
    //       this.pageSize
    //     )
    //   )
    // );

    // this.dishes$.subscribe(x => {
    //   this.dishesPagination = x.pagination;
    // });
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

  findDishes(name: string) {
    if (name !== '') {
      this.dishesService.getDishes(
        name,
        this.userId,
        this.dishesPagination ? this.dishesPagination.currentPage : this.pageNumber,
        this.dishesPagination ? this.dishesPagination.itemsPerPage : this.pageSize
      ).subscribe((res: PaginatedResult<Dish[]>) => {
        this.dishes = res.result;
        this.dishesPagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  findIngredients(name: string) {
    if (name !== '') {
      this.ingredientsService.getIngredientsByName(name, 1, 10);
    }
  }

  joinArrays() {}

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

  setSearchMode(searchMode: string) {
    if (searchMode === 'all') {
      this.userId = null;
    } else {
      this.userId = this.user.id;
    }
  }

  pageChanged(event: any, name: string) {
    this.dishesPagination.currentPage = event.page;
    this.findDishes(name);
  }
}
