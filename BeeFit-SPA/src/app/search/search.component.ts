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
    this.selectRadio();
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

    const radioGroup = document.querySelector('#' + radioGroupName);

    if (radioGroup) {
      const radioGroupElements = Array.from(radioGroup.querySelectorAll('div'));

      radioGroupElements[0].querySelector('input').setAttribute('checked', 'checked');

      const frame =  document.querySelector('.' + radioGroupName) as HTMLElement;
      frame.style.width = radioGroupElements[0].offsetWidth + 'px';

      for (const element of radioGroupElements) {
        element.querySelector('input').style.display = 'none';

        if (element.querySelector('input').checked) {
          element.querySelector('label').style.color = 'rgb(63, 63, 63);';
          const newLeftPosition = element.offsetLeft +
           parseInt(window.getComputedStyle(element).paddingLeft, 10) +
           parseInt(window.getComputedStyle(element.querySelector('label')).marginLeft, 10);
          const newWidth = element.querySelector('label').getBoundingClientRect().width;
          frame.style.left = newLeftPosition + 'px';
          frame.style.width = newWidth + 'px';
        } else {
          element.querySelector('label').style.color = '#fff';
        }
      }
    }
  }
}
