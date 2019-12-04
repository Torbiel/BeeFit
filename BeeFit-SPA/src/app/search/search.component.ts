import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodSearchParams } from '../_models/FoodSearchParams';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() userId: number;
  @Output() searched = new EventEmitter<any>();
  @Output() filtersApplied = new EventEmitter<any>();
  @Output() filtersReset = new EventEmitter<any>();
  filterParams: FoodSearchParams;

  constructor() {
    this.filterParams = new FoodSearchParams();
  }

  ngOnInit() {
  }

  search() {
    this.searched.emit(this.filterParams);
  }

  applyFilters() {
    this.filtersApplied.emit(this.filterParams);
  }

  resetFilters() {
    this.nullifyParams(this.filterParams);
    console.log(this.filterParams);
    this.filtersReset.emit(this.filterParams);
  }

  nullifyParams(obj: FoodSearchParams) {
    Object.keys(obj).forEach(index => {
      if (!index.match('name')) {
        obj[index] = null;
      }
    });
  }
}
