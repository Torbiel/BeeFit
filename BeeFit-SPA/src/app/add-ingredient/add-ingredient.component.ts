import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../_models/Ingredient';
import { MatExpansionModule, } from '@angular/material';
import { IngredientsService } from '../_services/ingredients.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {
  ingredient: Ingredient;
  ingredientForm: FormGroup;
  requiredFieldMessage = 'This field is required.';
  infoTextQuantity = 'Please provide nutrients per 100 g or 100 ml of ingredient.';

  constructor(private ingredientsService: IngredientsService,
              private alertify: AlertifyService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ingredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: [''],
      unit: ['', Validators.required],
      gramsPerUnit: ['', Validators.required],
      callories: ['', Validators.required],
      fats: ['', Validators.required],
      proteins: ['', Validators.required],
      animalProteins: [''],
      plantProteins: [''],
      carbohydrates: ['', Validators.required],
      sugars: [''],
      saturatedFats: [''],
      monounsaturatedFats: [''],
      polyunsaturatedFats: [''],
      omega3: [''],
      omega6: [''],
      fiber: [''],
      salt: [''],
      cholesterol: [''],
      vitaminA: [''],
      vitaminB1: [''],
      vitaminB2: [''],
      vitaminB5: [''],
      vitaminB6: [''],
      vitaminB7: [''],
      vitaminB9: [''],
      vitaminB12: [''],
      vitaminC: [''],
      vitaminD: [''],
      vitaminE: [''],
      vitaminPP: [''],
      vitaminK: [''],
      zinc: [''],
      phosphorus: [''],
      iodine: [''],
      magnesium: [''],
      copper: [''],
      potassium: [''],
      selenium: [''],
      sodium: [''],
      calcium: [''],
      iron: ['']
    });
  }

  // fatsQuantityValidator(control: AbstractControl) {
  //   const fatsSum = control.get monounsaturatedFats + this.ingredient.polyunsaturatedFats + this.ingredient.saturatedFats;

  //   return fatsSum > this.ingredient.fats ? { notEqual: true } : null;
  // }

  addIngredient() {
    this.ingredient = new Ingredient(this.ingredientForm.value);

    this.ingredientsService.add(this.ingredient).subscribe(
      () => {
        this.alertify.success('Ingredient added.');
        this.router.navigate(['/my-food']);
      }, error => {
        this.alertify.error(error);
      }
    );
  }
}
