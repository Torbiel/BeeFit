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
    this.filterParams.name = null;
    this.filterParams.userId = null;
    this.filterParams.minCallories = null;
    this.filterParams.maxCallories = null;
    this.selectRadio('radioGroupSearchMode');
    this.selectRadio('radioGroupOrder');
    this.selectRadio('radioGroupAscending');
  }

  search() {
    this.searched.emit(this.filterParams);
  }

  applyFilters() {
    this.filtersApplied.emit(this.filterParams);
  }

  resetFilters() {
    this.filterParams = Object.keys(this.filterParams).reduce((newParams, key) => {
      if (key === 'name') {
        newParams[key] = this.filterParams[key];
      }

      return newParams;
    }, new FoodSearchParams());

    this.filtersReset.emit(this.filterParams);
  }

  selectRadio(radioGroupName?: string) {
    let radioGroup = document.querySelector('#' + radioGroupName);

    let radioGroupElements = Array.from(radioGroup.querySelectorAll('div'));

      const frame =  document.querySelector('.' + radioGroupName) as HTMLElement;
      frame.style.width = radioGroupElements[0].offsetWidth + 'px';

    let frame = <HTMLElement>document.querySelector('.' + radioGroupName);
    frame.style.width = radioGroupElements[0].offsetWidth + 'px';

    for (let element of radioGroupElements) {
      element.querySelector('input').style.display='none';
      if (element.querySelector('input').checked) {

        element.querySelector('label').style.color = 'rgb(39, 39, 39)';
        let newLeftPosition = element.offsetLeft +
          parseFloat(window.getComputedStyle(element).paddingLeft) +
          parseFloat(window.getComputedStyle(element).marginLeft);
        let newWidth = element.querySelector('label').offsetWidth;
        frame.style.left = newLeftPosition + 'px';
        frame.style.width = newWidth + 'px';
      } else {
        element.querySelector('label').style.color = '#fff';
      }
    }
  }
}
