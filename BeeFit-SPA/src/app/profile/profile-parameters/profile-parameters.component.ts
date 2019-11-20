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
  parametersDates: Date[];
  addingMode = false;
  editMode = false;
  today = new Date();
  newParameter = {
    date: new Date(),
    weight: 0,
    abdominalCircumference: 0,
    bicepsCircumference: 0,
    thighCircumference: 0
  } as UsersParameter;

  constructor(private userService: UserService, private alertify: AlertifyService) {

   }

  ngOnInit() {
    this.getUser();
    

  }

 compare(a, b) {
  if (a.last_nom < b.last_nom) {
    return -1;
  }
  if (a.last_nom > b.last_nom) {
    return 1;
  }
  return 0;
}

  prepareDatesToFilter() {
    this.parametersDates = [...new Set(this.user.parameters.map(parameter => parameter.date))];
    
  }

  getUser() {
    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = user; 
      this.prepareDatesToFilter();
    }, error => {
      this.alertify.error(error);
    });
  }

  toggleAdd() {
    this.addingMode = !this.addingMode;
  }

  toggleEdit(index: number) {
    this.editMode = !this.editMode;

    var row = document.getElementById('parameter[' + index + ']');
    var fields = row.querySelectorAll('td input');
    for (let i = 0; i < fields.length; i++) {
      fields[i].classList.toggle('read-only'); console.log(fields[i]);
    }
  }

  addParameter() {
    if (!this.newParameter.weight && !this.newParameter.abdominalCircumference && !this.newParameter.bicepsCircumference &&
        !this.newParameter.thighCircumference) {
      this.alertify.error('You didn\'t fill any of the parameters.');
    } else {
      this.user.parameters.push(this.newParameter);
      this.userService.updateUser(this.user).subscribe(next => {
        this.alertify.success('Parameters added.');
      }, error => {
        this.alertify.error(error);
      });

      this.toggleAdd();
    }
  }

  editParameter(index: number) {

    if (this.toggleEdit) {
      if (0) {
        this.alertify.error('You didn\'t fill any of the parameters.');
      } else {       
        this.userService.updateUser(this.user).subscribe(next => {
          this.alertify.success('Parameters added.');
          this.toggleEdit(index);
        }, error => {
          this.alertify.error(error);
        });
      }
    }
  }
    deleteParameter(id: number) {
      this.user.parameters.splice(id, 1);
      this.userService.updateUser(this.user).subscribe(next => {
        this.alertify.success('Parameters removed');
      }, error => {
        this.alertify.error(error);
      });

  }

  saveChanges() {
    this.userService.updateUser(this.user).subscribe(next => {
      this.alertify.success('Profile updated');
    }, error => {
      this.alertify.error(error);
    });

    this.toggleAdd();
  }

}
