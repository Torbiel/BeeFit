import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodSearchParams, FoodOrderBy } from '../_models/FoodSearchParams';
import { AlertifyService } from '../_services/alertify.service';

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

  constructor(private alertify: AlertifyService) {
    this.filterParams = new FoodSearchParams();
    this.filterParams.userId = 0;
    this.filterParams.ascending = true;
    this.filterParams.orderBy = 0;
  }

  ngOnInit() {
    this.selectRadio('radioGroupSearchMode');
    this.selectRadio('radioGroupOrder');
    this.selectRadio('radioGroupAscending');
  }

  search() {
    if (this.filterParams.name.replace(/\s/g, '').length > 0 && this.checkForNegatives()) {
      this.searched.emit(this.filterParams);
    }
  }

  checkForNegatives(): boolean {
    Object.values(this.filterParams).forEach(value => {
      if (value < 0) {
        this.alertify.error('Search parameters can\'t be negative.');
        throw 0;
      }
    });

    return true;
  }

  applyFilters() {
    if (this.filterParams.name.replace(/\s/g, '').length > 0 && this.checkForNegatives()) {
      this.filtersApplied.emit(this.filterParams);
    }
  }

  resetFilters() {
    this.filterParams = Object.keys(this.filterParams).reduce((newParams, key) => {
      if (key === 'name') {
        newParams[key] = this.filterParams[key];
      }

      return newParams;
    }, new FoodSearchParams());

    this.selectRadio('radioGroupOrder');
    this.selectRadio('radioGroupAscending');
    this.filterParams.ascending = true;
    this.filterParams.orderBy = 0;
    this.filtersReset.emit(this.filterParams);
  }

  selectRadio(radioGroupName?: string) {
    const radioGroup = document.querySelector('#' + radioGroupName);

    const radioGroupElements = Array.from(radioGroup.querySelectorAll('div'));

    const frame =  document.querySelector('.' + radioGroupName) as HTMLElement;
    frame.style.width = radioGroupElements[0].offsetWidth + 'px';


    for (const element of radioGroupElements) {
      if (element.querySelector('input')) {
        element.querySelector('input').style.display = 'none';

        if (element.querySelector('input').checked) {

          element.querySelector('label').style.color = 'rgb(39, 39, 39)';
          const newLeftPosition = element.offsetLeft +
            parseFloat(window.getComputedStyle(element).paddingLeft) +
            parseFloat(window.getComputedStyle(element).marginLeft);
          const newWidth = element.querySelector('label').offsetWidth;
          frame.style.left = newLeftPosition + 'px';
          frame.style.width = newWidth + 'px';
        } else {
          element.querySelector('label').style.color = '#fff';
        }
      }
    }
  }
}
