import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-meal-my-food',
  templateUrl: './add-meal-my-food.component.html',
  styleUrls: ['./add-meal-my-food.component.css']
})
export class AddMealMyFoodComponent implements OnInit {
  @Input() user: User;

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
