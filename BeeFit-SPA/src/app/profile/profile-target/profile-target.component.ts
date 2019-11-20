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
  autoMode = true;
  actualWeight: number;
  dailyCalories = 0;
  dayActivity = 0
  trainingActivity = 0
  changePerWeek = 0
  estimatedCalories = 0;
  proteinsResult = 0;
  fatsResult = 0;
  carbohydratesResult = 0;
  weeksFromNow = 0;
  estimatedWeight = this.actualWeight;
  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getUser();

  }

  getUser() {
    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = user;
      this.user.parameters = this.user.parameters.sort((a, b) => (a.date < b.date) ? 1 : -1)
      this.actualWeight = this.user.parameters[0].weight;

    }, error => {
      this.alertify.error(error);
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveChanges() {

  }

  calculate() {
    this.estimatedWeight = parseFloat((<HTMLInputElement>document.getElementById('estimatedWeight')).value);

    if (this.autoMode) {
      var changePerWeek = (this.estimatedWeight - this.actualWeight) / Math.abs(this.weeksBetween(new Date(), new Date((<HTMLInputElement>document.getElementById('estimatedTime')).value)));
      console.log(this.weeksBetween(new Date(), new Date((<HTMLInputElement>document.getElementById('estimatedTime')).value)));
    } else {
      var changePerWeek = parseFloat((<HTMLInputElement>document.getElementById('changePerWeek')).value);
    }
    this.dayActivity = parseFloat((<HTMLInputElement>document.getElementById('dayActivity')).value);
    this.dayActivity = parseFloat((<HTMLInputElement>document.getElementById('dayActivity')).value);
    this.trainingActivity = parseFloat((<HTMLInputElement>document.getElementById('trainingActivity')).value);

    var caloricDeficit = 7000 * changePerWeek;
    this.dailyCalories = (this.dayActivity * 0.2 + 1.1 + this.trainingActivity * 0.1)*this.actualWeight * 22;
    this.estimatedCalories = this.dailyCalories + caloricDeficit/7;
    if (this.estimatedCalories < 0) {
      this.estimatedCalories = 0;
    }
    this.proteinsResult = this.actualWeight * (this.dayActivity * 0.25 + 1.1 + this.trainingActivity * 0.2 );
    this.fatsResult = this.actualWeight;
    this.carbohydratesResult = (this.estimatedCalories - (this.proteinsResult*4 + this.fatsResult*9))/4;

  }

  weeksBetween(d1, d2) {
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
  }
  calculationTypeToggle() {
    var autoModeLabel = document.querySelector('.autoCalculation');
    var manualModeLabel = document.querySelector('.manualCalculation');

    if (autoModeLabel.querySelector('input').checked) {
      autoModeLabel.classList.remove('unselected');
      autoModeLabel.classList.add('selected');

      this.autoMode = true;

    } else if (manualModeLabel.querySelector('input').checked){
      autoModeLabel.classList.remove('selected');
      autoModeLabel.classList.add('unselected');
      this.autoMode = false;
    }
  }
}
