import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-meal-add-new',
  templateUrl: './add-meal-add-new.component.html',
  styleUrls: ['./add-meal-add-new.component.css']
})
export class AddMealAddNewComponent implements OnInit {
  @Input() user: User;

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
