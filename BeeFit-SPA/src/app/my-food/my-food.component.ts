import { Component, OnInit } from '@angular/core';
import { DishesService } from '../_services/dishes.service';
import { IngredientsService } from '../_services/ingredients.service';
import { UserService } from '../_services/user.service';
import { Dish } from '../_models/Dish';
import { Ingredient } from '../_models/Ingredient';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { PaginatedResult } from '../_models/Pagination';

@Component({
  selector: 'app-my-food',
  templateUrl: './my-food.component.html',
  styleUrls: ['./my-food.component.css']
})
export class MyFoodComponent implements OnInit {
  userId: string;
  dishes: PaginatedResult<Dish[]>;
  ingredients: PaginatedResult<Ingredient[]>;
  ingredient: Ingredient;

  constructor(private dishesService: DishesService,
              private ingredientsService: IngredientsService,
              private alertify: AlertifyService,
              public router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getDishes();
    this.getIngredients();
    this.ingredientsService.currentIngredient.subscribe(ingredient => this.ingredient = ingredient);
  }

  getDishes() {
    this.dishesService.getDishesByUserId().subscribe(
      (dishes: PaginatedResult<Dish[]>) => {
        this.dishes = dishes;
      }, error => {
        this.alertify.error(error);
      }
    );
  }

  getIngredients() {
    this.ingredientsService.getIngredientsByUserId().subscribe(
      (ingredients: PaginatedResult<Ingredient[]>) => {
        this.ingredients = ingredients;
      }, error => {
        this.alertify.error(error);
      }
    );
  }

  deleteDish(id: number) {
    this.dishesService.delete(id).subscribe(() => {
      this.alertify.success('Dish deleted.');
      this.getDishes();
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteIngredient(id: number) {
    this.ingredientsService.delete(id).subscribe(() => {
      this.alertify.success('Ingredient deleted');
      this.getIngredients();
    }, error => {
      this.alertify.error(error);
    });
  }

  editDish(dish: Dish) {

  }

  editIngredient(ingredient: Ingredient) {
    this.ingredientsService.changeIngredient(ingredient);
    this.router.navigate(['/update-ingredient']);
  }
}
