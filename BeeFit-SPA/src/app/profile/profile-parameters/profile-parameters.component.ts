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
  rowsToEdit: number[] = [];
  newParameter = {
    weight: null,
    abdominalCircumference: null,
    bicepsCircumference: null,
    thighCircumference: null
  } as UsersParameter;
  parametersAfterFilter: UsersParameter[];

  constructor(private userService: UserService, private alertify: AlertifyService) {}

  ngOnInit(dateFrom?, dateTo?) {
    this.getUser();
    if (dateFrom && dateTo) {
      this.dateFrom = dateFrom;
      this.dateTo = dateTo;
    }
    this.newParameter.weight = null;
    this.newParameter.abdominalCircumference = null;
    this.newParameter.bicepsCircumference = null;
    this.newParameter.thighCircumference = null;
   
  
    
  }

  prepareDatesToFilter() {
    this.sortParameters(this.user.parameters);
    this.parametersDates = [...new Set(this.user.parameters.map(parameter => parameter.date))];
    this.dateTo = this.parametersDates[0].toString().substr(0, 10);
    this.dateFrom = this.parametersDates[this.parametersDates.length - 1].toString().substr(0, 10);

  }
   getUser() {
    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = user;
      this.user.parameters = user.parameters;
      this.prepareDatesToFilter();
      this.filterParameters();
    }, error => {
      this.alertify.error(error);
    });
  }

  toggleAdd() {
    this.addingMode = !this.addingMode;
  }

  toggleEdit(index: number) {
    this.editMode = !this.editMode;
    if (this.rowsToEdit.includes(index)) {
      this.rowsToEdit.splice(this.rowsToEdit.indexOf(index), 1);
    } else {
       this.rowsToEdit.push(index);
    }
    const row = document.getElementById('parameter[' + index + ']');
    const fields = row.getElementsByClassName('td-input');
    for (let i = 0; i < fields.length; i++) {
      fields[i].classList.toggle('read-only');
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
        this.getUser();
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
      this.dateTo = this.dateFrom;
      (document.getElementsByName("dateTo")[0] as HTMLInputElement).value  = this.dateFrom.toString();
    }
    this.filterParameters();
  }

  setDateTo(date: Date) {
    this.dateTo = date.toString().substr(0, 10);
    if ( this.dateTo < this.dateFrom) {
      this.dateFrom = this.dateTo;
      (document.getElementsByName("dateFrom")[0] as HTMLInputElement).value  = this.dateTo.toString();
    }
    this.filterParameters();
  }

  filterParameters() {
    this.parametersAfterFilter = this.user.parameters.filter(a => a.date.toString().substr(0, 10) >= this.dateFrom && a.date.toString().substr(0, 10) <= this.dateTo);

  //  this.sortParameters(this.user.parameters);
  }

  sortParameters(values) {
    values = values.sort(
      function (a, b) {
        let keyA = a.date.toString().substr(0, 10),
          keyB = b.date.toString().substr(0, 10);
        // Compare the 2 dates
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
      }
    );
  }

  validate() {
     document.querySelectorAll('input[type="number"]').forEach((input) => {
      if (typeof((input as HTMLInputElement).value[0]) == 'undefined') {
      (input  as HTMLInputElement).value = '';
    }
   });
  }

  canEdit(i: number) {
    if (this.rowsToEdit.includes(i)) {
      return true;
    } else {
      false;
    }
  }
}
