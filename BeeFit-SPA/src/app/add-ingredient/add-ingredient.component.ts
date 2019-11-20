import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../_models/Ingredient';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {
  ingredient = new Ingredient();

  constructor() { }

  ngOnInit() {
  }

  setName(name: string) {
    this.ingredient.name = name;
  }

  setBrand(brand: string) {
    this.ingredient.brand = brand;
  }

  setUnit(unit: string) {

  }

  setGramsPerUnit(gramsPerUnit: number) {
    this.ingredient.gramsPerUnit = gramsPerUnit;
  }

  setCallories(callories: number) {
    this.ingredient.callories = callories;
  }

  setFats(fats: number) {
    this.ingredient.fats = fats;
  }

  setCarbohydrates(carbohydrates: number) {
    this.ingredient.carbohydrates = carbohydrates;
  }

  setSugars(sugars: number) {
    this.ingredient.sugars = sugars;
  }

  setProteins(proteins: number) {
    this.ingredient.proteins = proteins;
  }
}
