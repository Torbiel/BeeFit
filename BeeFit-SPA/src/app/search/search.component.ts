import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  filterParams: any = {};

  constructor() { }

  ngOnInit() {
    this.filterParams.name = null;
    this.filterParams.userId = null;
    this.filterParams.minCallories = null;
    this.filterParams.maxCallories = null;
  }

  search() {
    this.searched.emit(this.filterParams);
  }

  applyFilters() {
    this.filtersApplied.emit(this.filterParams);
  }

  resetFilters() {
    this.filterParams.userId = null;
    this.filterParams.minCallories = null;
    this.filterParams.maxCallories = null;
    this.filtersReset.emit(this.filterParams);
  }
}
