import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../_models/Ingredient';
import { IngredientsService } from '../_services/ingredients.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-ingredient-list-item',
  templateUrl: './ingredient-list-item.component.html',
  styleUrls: ['./ingredient-list-item.component.css']
})
export class IngredientListItemComponent implements OnInit {
  @Input() ingredient: Ingredient;
  @Output() deleted = new EventEmitter<number>();

  constructor(private ingredientsService: IngredientsService,
              private alertify: AlertifyService) { }

  ngOnInit() {
  }

  deleteIngredient(id: number) {
    this.ingredientsService.delete(id).subscribe(() => {
      this.alertify.success('Ingredient deleted');
      this.deleted.emit(id);
    }, error => {
      this.alertify.error(error);
    });
  }
}
