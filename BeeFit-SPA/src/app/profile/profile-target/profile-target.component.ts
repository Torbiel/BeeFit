import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-profile-target',
  templateUrl: './profile-target.component.html',
  styleUrls: ['./profile-target.component.css']
})
export class ProfileTargetComponent implements OnInit {
  user: User;
  editMode = false;

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

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveChanges() {

  }

}
