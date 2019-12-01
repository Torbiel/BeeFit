import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() userId: number;
  @Output() searched = new EventEmitter<string>();
  filterParams: any = {};

  constructor() { }

  ngOnInit() {
  }

  search(name: string) {
    this.searched.emit(name);
  }

  applyFilters(name: string) {

  }

  resetFilters(name: string) {

  }

  resetPagination() {

  }
}
