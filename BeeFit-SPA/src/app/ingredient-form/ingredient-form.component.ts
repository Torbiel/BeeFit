import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../_models/Ingredient';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngredientsService } from '../_services/ingredients.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent implements OnInit {
  ingredient: Ingredient;
  ingredientForm: FormGroup;
  requiredFieldMessage = 'This field is required.';
  infoTextQuantity = 'Please provide nutrients per 100 g or 100 ml of ingredient.';
  ingredientId: number;
  ingredient$: Observable<Ingredient>;

  constructor(
    private ingredientsService: IngredientsService,
    private alertify: AlertifyService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // If it's edit
    if (this.route.snapshot.paramMap.get('id')) {
      this.ingredient$ = this.route.paramMap.pipe(
        switchMap(params => {
          this.ingredientId = +params.get('id');
          return this.ingredientsService.getById(this.ingredientId);
        }
      ));

      this.ingredient$.subscribe(
        (ing) => {
          this.ingredient = ing;
          this.createForm();
        }, error => {
          this.alertify.error(error);
        }
      );
    } else {
      this.ingredient = new Ingredient(null);
      this.createForm();
    }
  }

  createForm() {
    this.ingredientForm = this.formBuilder.group({
      name: [this.ingredient.name, Validators.required],
      brand: [this.ingredient.brand],
      unit: [this.ingredient.unit, Validators.required],
      gramsPerUnit: [this.ingredient.gramsPerUnit, Validators.required],
      callories: [this.ingredient.callories, Validators.required],
      fats: [this.ingredient.fats, Validators.required],
      proteins: [this.ingredient.proteins, Validators.required],
      animalProteins: [this.ingredient.animalProteins],
      plantProteins: [this.ingredient.plantProteins],
      carbohydrates: [this.ingredient.carbohydrates, Validators.required],
      sugars: [this.ingredient.sugars],
      saturatedFats: [this.ingredient.saturatedFats],
      monounsaturatedFats: [this.ingredient.monounsaturatedFats],
      polyunsaturatedFats: [this.ingredient.polyunsaturatedFats],
      omega3: [this.ingredient.omega3],
      omega6: [this.ingredient.omega6],
      fiber: [this.ingredient.fiber],
      salt: [this.ingredient.salt],
      cholesterol: [this.ingredient.cholesterol],
      vitaminA: [this.ingredient.vitaminA],
      vitaminB1: [this.ingredient.vitaminB1],
      vitaminB2: [this.ingredient.vitaminB2],
      vitaminB5: [this.ingredient.vitaminB5],
      vitaminB6: [this.ingredient.vitaminB6],
      vitaminB7: [this.ingredient.vitaminB7],
      vitaminB9: [this.ingredient.vitaminB9],
      vitaminB12: [this.ingredient.vitaminB12],
      vitaminC: [this.ingredient.vitaminC],
      vitaminD: [this.ingredient.vitaminD],
      vitaminE: [this.ingredient.vitaminE],
      vitaminPP: [this.ingredient.vitaminPP],
      vitaminK: [this.ingredient.vitaminK],
      zinc: [this.ingredient.zinc],
      phosphorus: [this.ingredient.phosphorus],
      iodine: [this.ingredient.iodine],
      magnesium: [this.ingredient.magnesium],
      copper: [this.ingredient.copper],
      potassium: [this.ingredient.potassium],
      selenium: [this.ingredient.selenium],
      sodium: [this.ingredient.sodium],
      calcium: [this.ingredient.calcium],
      iron: [this.ingredient.iron]
    });
  }

  // fatsQuantityValidator(control: AbstractControl) {
  //   const fatsSum = control.get monounsaturatedFats + this.ingredient.polyunsaturatedFats + this.ingredient.saturatedFats;

  //   return fatsSum > this.ingredient.fats ? { notEqual: true } : null;
  // }

  upsertIngredient() {
    this.ingredient = new Ingredient(this.ingredientForm.value);
    this.ingredient.userId = +localStorage.getItem('userId');
    this.ingredient.id = this.ingredientId;

    if (this.ingredient.id === undefined) {
      this.ingredientsService.add(this.ingredient).subscribe(
        () => this.ingredientSaved(),
        error => {
          this.alertify.error(error);
        }
      );
    } else {
      this.ingredientsService.update(this.ingredient, this.ingredient.id).subscribe(
        () => this.ingredientSaved(),
        error => {
          this.alertify.error(error);
        }
      );
    }
  }

  ingredientSaved() {
    this.alertify.success('Ingredient saved.');
    this.router.navigate(['/my-food']).then(() => window.location.reload());
  }
}
