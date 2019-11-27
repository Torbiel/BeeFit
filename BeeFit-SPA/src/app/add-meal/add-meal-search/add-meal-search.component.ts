import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import { DateService } from 'src/app/_services/date.service';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-meal-search',
  templateUrl: './add-meal-search.component.html',
  styleUrls: ['./add-meal-search.component.css']
})
export class AddMealSearchComponent implements OnInit {
  meal: Meal;
  @Input() userId: number;
  @Output() addMode = new EventEmitter<boolean>();
  mealType: number;
  route: ActivatedRoute;
  currentDate: Date;
  private dishesSearchName = new Subject<string>();
  private ingredientsSearchName = new Subject<string>();
  private searchName = new Subject<string>();
  ingredients$: Observable<Ingredient[]>;
  dishes$: Observable<Dish[]>;
  searchResults$: Observable<(Dish[] | Ingredient[])>;

  constructor(private dishesService: DishesService,
              private alertify: AlertifyService,
              private ingredientsService: IngredientsService,
              private mealService: MealService,
              public router: Router,
              private mealTypeService: MealtypeService,
              private dateService: DateService) { }

  ngOnInit() {
    this.mealTypeService.currentMealType.subscribe(mealtype => this.mealType = mealtype);
    this.dateService.currentDate.subscribe(date => this.currentDate = date);

    this.ingredients$ = this.ingredientsSearchName.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.ingredientsService.getIngredientsByName(name)),
    );

    this.dishes$ = this.dishesSearchName.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.dishesService.getDishesByName(name)),
    );
  }

  findDishes(name: string) {
    if (name !== '') {
      this.dishesSearchName.next(name);
    }
  }

  findIngredients(name: string) {
    if (name !== '') {
      this.ingredientsSearchName.next(name);
    }
  }

  joinArrays() {
  }

  addToMeal(dishId: number, ingredientId: number) {
    this.meal = new Meal();
    this.meal.type = this.mealType;
    this.meal.date = this.currentDate;
    this.meal.userId = this.userId;
    this.meal.dishId = dishId;
    this.meal.ingredientId = ingredientId;

    this.mealService.add(this.meal).subscribe(() => {
      this.alertify.success('Meal added.');
      this.addMode.emit(false);
    }, error => {
      this.alertify.error(error);
    });
  }
}
