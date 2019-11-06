import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UsersParameter } from 'src/app/_models/UsersParameter';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-profile-parameters',
  templateUrl: './profile-parameters.component.html',
  styleUrls: ['./profile-parameters.component.css']
})
export class ProfileParametersComponent implements OnInit {
  @Input() public user: User;
  addingMode = false;
  today = new Date();
  newParameter = {
    date: new Date(),
    weight: null,
    abdominalCircumference: null,
    bicepsCircumference: null,
    thighCircumference: null
  } as UsersParameter;

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

  toggleAdd() {
    this.addingMode = !this.addingMode;
  }

  addParameter() {
    if (!this.newParameter.weight && !this.newParameter.abdominalCircumference && !this.newParameter.bicepsCircumference &&
        !this.newParameter.thighCircumference) {
      this.alertify.error('You didn\'t fill any of the parameters.');
    }

    this.user.parameters.push(this.newParameter);

    this.userService.updateUser(this.user).subscribe(next => {
      this.alertify.success('Parameters added.');
    }, error => {
      this.alertify.error(error);
    });

    this.toggleAdd();
  }
}
