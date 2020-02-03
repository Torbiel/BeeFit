import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from '../_models/Dish';
import { DishesService } from '../_services/dishes.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-dish-list-item',
  templateUrl: './dish-list-item.component.html',
  styleUrls: ['./dish-list-item.component.css']
})
export class DishListItemComponent implements OnInit {
  @Input() dish: Dish;
  @Output() deleted = new EventEmitter<number>();

  constructor(private dishesService: DishesService,
              private alertify: AlertifyService) { }

  ngOnInit() {
  }

  deleteDish(id: number) {
    this.dishesService.delete(id).subscribe(() => {
      this.alertify.success('Dish deleted.');
      this.deleted.emit(id);
    }, error => {
      this.alertify.error(error);
    });
  }
}
