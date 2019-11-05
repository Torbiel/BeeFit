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

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.user = history.state.data.user;
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    this.userService.updateUser(this.user).subscribe(next => {
      this.alertify.success('Profile updated');
    }, error => {
      this.alertify.error(error);
    });
    this.toggleEdit();
  }
}