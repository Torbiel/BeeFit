import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-Info',
  templateUrl: './Info.component.html',
  styleUrls: ['./Info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
