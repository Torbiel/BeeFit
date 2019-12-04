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
    this.selectRadio();
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

  selectRadio(radioGroupName?: string) {

    var radioGroup = document.querySelector('#' + radioGroupName); console.log(radioGroup);

    var radioGroupElements = Array.from(radioGroup.querySelectorAll('div'));

    radioGroupElements[0].querySelector('input').setAttribute("checked", "checked");

    var frame = <HTMLElement>document.querySelector('.' + radioGroupName);
    frame.style.width = radioGroupElements[0].offsetWidth+'px';

    for (let element of radioGroupElements) {
      element.querySelector('input').style.display='none';
      if (element.querySelector('input').checked) {
        element.querySelector('label').style.color = '#000';
        var newLeftPosition = element.offsetLeft +
         parseInt(window.getComputedStyle(element).paddingLeft, 10) +
         parseInt(window.getComputedStyle(element.querySelector('label')).marginLeft, 10);
        var newWidth = element.querySelector('label').getBoundingClientRect().width;
        frame.style.left = newLeftPosition + 'px';
        frame.style.width = newWidth + 'px';
      } else {
        element.querySelector('label').style.color = '#fff';
      }
    }

  }
}
