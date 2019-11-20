import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IngredientsService } from '../_services/ingredients.service';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Ingredient } from '../_models/Ingredient';
import { Dish } from '../_models/Dish';
import { DishesService } from '../_services/dishes.service';
import { DishesIngredient } from '../_models/DishesIngredient';
import { AlertifyService } from '../_services/alertify.service';
import { MealtypeService } from '../_services/mealtype.service';
import { DateService } from '../_services/date.service';
import { Meal } from '../_models/Meal';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  ingredients$: Observable<Ingredient[]>;
  private ingredientSearchName = new Subject<string>();
  addedIngredients = new Array<DishesIngredient>();
  dish = new Dish();
  mealType: number;
  currentDate: Date;
  meal: Meal;
  @Input() userId: number;

  constructor(public router: Router,
              private ingredientsService: IngredientsService,
              private dishesService: DishesService,
              private alertify: AlertifyService,
              private mealTypeService: MealtypeService,
              private dateService: DateService) { }

  ngOnInit() {
    this.ingredients$ = this.ingredientSearchName.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.ingredientsService.getIngredientsByName(name)),
    );

    this.mealTypeService.currentMealType.subscribe(mealtype => this.mealType = mealtype);
    this.dateService.currentDate.subscribe(date => this.currentDate = date);
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
      '100',
      function(evt: any, value: any) {
        const dishesIngredient = new DishesIngredient();
        dishesIngredient.ingredientId = ing.id;
        dishesIngredient.quantity = value;
        this.addedIngredients.push(dishesIngredient); }
    );
  }

  addDishesIngredient(ingId: number, quantity: number) {
    const dishesIngredient = new DishesIngredient();
    dishesIngredient.ingredientId = ingId;
    dishesIngredient.quantity = quantity;
    this.addedIngredients.push(dishesIngredient);
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

    this.dishesService.add(this.dish).subscribe(() => {
      this.alertify.success('Dish added.');
      this.router.navigate(['/my-food']);
    }, error => {
      this.alertify.error(error);
    });
  }
}
