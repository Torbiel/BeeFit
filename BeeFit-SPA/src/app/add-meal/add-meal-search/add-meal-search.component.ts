import { Component, OnInit } from '@angular/core';
import { DishesService } from 'src/app/_services/dishes.service';
import { Dish } from 'src/app/_models/Dish';
import { Ingredient } from 'src/app/_models/Ingredient';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-add-meal-search',
  templateUrl: './add-meal-search.component.html',
  styleUrls: ['./add-meal-search.component.css']
})
export class AddMealSearchComponent implements OnInit {
  name: string;
  dishes: Dish[];
  ingredients: Ingredient[];

  constructor(private dishesService: DishesService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  findDishes() {
    this.dishesService.getDishesByName(name).subscribe((dishes: Dish[]) => {
      this.dishes = dishes;
    }, error => {
      this.alertify.error(error);
    });
  }

  findIngredients() {
    
  }
}
