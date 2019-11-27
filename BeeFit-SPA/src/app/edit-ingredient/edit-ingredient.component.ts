import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../_models/Ingredient';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IngredientsService } from '../_services/ingredients.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent implements OnInit {
  ingredientId: number;
  ingredient$: Observable<Ingredient>;
  ingredient: Ingredient;
  ingredientForm: FormGroup;
  requiredFieldMessage = 'This field is required.';

  constructor(
    private formBuilder: FormBuilder,
    private ingredientsService: IngredientsService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
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

  updateIngredient() {
    const id = this.ingredient.id;
    this.ingredient = new Ingredient(this.ingredientForm.value);

    this.ingredientsService.update(id, this.ingredient).subscribe(
      () => {
        this.alertify.success('Ingredient updated');
        this.router.navigate(['/my-food']);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
}
