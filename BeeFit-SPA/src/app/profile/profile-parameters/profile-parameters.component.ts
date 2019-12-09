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
  dateFrom: String;
  dateTo: String;
  addingMode = false;
  editMode = false;
  today = new Date();
  newParameter = {
    weight: null,
    abdominalCircumference: null,
    bicepsCircumference: null,
    thighCircumference: null
  } as UsersParameter;
  parametersAfterFilter: UsersParameter[];

  constructor(private userService: UserService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.getUser();
    this.filterParameters();
    this.newParameter.weight = null;
    this.newParameter.abdominalCircumference = null;
    this.newParameter.bicepsCircumference = null;
    this.newParameter.thighCircumference = null;
    this.prepareDatesToFilter();
  }

  prepareDatesToFilter() {
    this.parametersDates = [...new Set(this.user.parameters.map(parameter => parameter.date))];
    this.sortParameters(this.user.parameters);
    this.dateFrom = this.parametersDates[2].toString().substr(0, 10);
    this.dateTo = this.parametersDates[this.parametersDates.length - 1].toString().substr(0, 10);

  }
   getUser() {
    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = user;
      this.user.parameters = user.parameters;
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

    const row = document.getElementById('parameter[' + index + ']');
    const fields = row.getElementsByClassName('td-input'); console.log(row);
    for (let i = 0; i < fields.length; i++) {
      fields[i].classList.toggle('read-only');
    }
  }

  addParameter() {
    if (!this.newParameter.weight && !this.newParameter.abdominalCircumference && !this.newParameter.bicepsCircumference &&
        !this.newParameter.thighCircumference) {
      this.alertify.error('You didn\'t fill any of the parameters.');
    } else {
      console.log(this.newParameter);
      this.user.parameters.push(this.newParameter);
      this.userService.updateUser(this.user).subscribe(next => {
        this.alertify.success('Parameters added.');
        this.ngOnInit();
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
          this.alertify.success('Parameters saved.');
          this.toggleEdit(index);
          this.ngOnInit();
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
        this.ngOnInit();
      }, error => {
        this.alertify.error(error);
      });

  }

  saveChanges() {
    this.userService.updateUser(this.user).subscribe(next => {
      this.alertify.success('Profile updated');
      this.ngOnInit();
    }, error => {
      this.alertify.error(error);
    });

    this.toggleAdd();
  }

  setDateFrom(date: Date) {
    this.dateFrom = date.toString().substr(0,10);
     if ( this.dateTo < this.dateFrom) {
      
      (document.getElementsByName("dateTo")[0] as HTMLInputElement).value  = this.dateFrom.toString();
    }
    this.filterParameters();
  }

  setDateTo(date: Date) {
    this.dateTo = date.toString().substr(0, 10);
    if ( this.dateTo < this.dateFrom) {
      
      (document.getElementsByName("dateFrom")[0] as HTMLInputElement).value  = this.dateTo.toString();
    }
    this.filterParameters();
  }

  filterParameters() {
    this.user.parameters = this.user.parameters.filter(a => a.date.toString().substr(0, 10) >= this.dateFrom && a.date.toString().substr(0, 10) <= this.dateTo);

    this.sortParameters(this.user.parameters);
  }

  sortParameters(values) {
    values = values.sort(
      function (a, b) {
        var keyA = a.date.toString().substr(0, 10),
          keyB = b.date.toString().substr(0, 10);
        // Compare the 2 dates
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
      }
    );
  }

}
