import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-add-meal-nav',
  templateUrl: './add-meal-nav.component.html',
  styleUrls: ['./add-meal-nav.component.css']
})
export class AddMealNavComponent implements OnInit {
  mealType: number;
  user: User;
  addingMode = 'search';
  @Output() addMode = new EventEmitter<boolean>();

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = user;
    }, error => {
      this.alertify.error(error);
    });
  }

  receiveAddMode($event) {
    this.addMode.emit($event);
  }

  setAddingMode(str: string) {
    this.addingMode = str;
  }
}
