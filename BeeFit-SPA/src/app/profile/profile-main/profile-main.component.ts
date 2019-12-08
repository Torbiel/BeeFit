import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';


@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css'],
})
export class ProfileMainComponent implements OnInit {
  @Input() public user: User;
  editMode = false;
  genderBeforeSet: number = 0;
  dateOfBirthBeforeSet: Date;
  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getUser();

  }

  getUser() {
    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = user;console.log(this.user);
      this.genderBeforeSet = user.gender;
      this.dateOfBirthBeforeSet = user.dateOfBirth;
    }, error => {
      this.alertify.error(error);
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    console.log(this.user);
    this.userService.updateUser(this.user).subscribe(next => {
      this.genderBeforeSet = this.user.gender;

      this.alertify.success('Profile updated');
    }, error => {
      this.alertify.error(error);
    });

    this.toggleEdit();
  }
}
