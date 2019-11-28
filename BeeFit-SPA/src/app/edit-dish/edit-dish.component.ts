import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Ingredient } from '../_models/Ingredient';
import { DishesIngredient } from '../_models/DishesIngredient';
import { Dish } from '../_models/Dish';
import { Router, ActivatedRoute } from '@angular/router';
import { IngredientsService } from '../_services/ingredients.service';
import { DishesService } from '../_services/dishes.service';
import { AlertifyService } from '../_services/alertify.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PaginatedResult } from '../_models/Pagination';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {
  ingredients$: Observable<PaginatedResult<Ingredient[]>>;
  private ingredientSearchName = new Subject<string>();
  addedIngredients = new Array<DishesIngredient>();
  dish$: Observable<Dish>;
  dish = new Dish();
  userId: number;
  dishId: number;
  pageNumber = 1;
  pageSize = 10;

  constructor(
    public router: Router,
    private ingredientsService: IngredientsService,
    private dishesService: DishesService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = +localStorage.getItem('userId');

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

    this.ingredients$ = this.ingredientSearchName.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.ingredientsService.getIngredientsByName(name, this.pageNumber, this.pageSize))
    );
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

  updateDish() {
    this.dish.ingredients = new Array<DishesIngredient>();
    this.addedIngredients.forEach(item => {
      this.dish.ingredients.push(item);
    });

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
}
