import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TargetService } from 'src/app/_services/target.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/User';
import { Target } from 'src/app/_models/Target';
import { empty } from 'rxjs';


@Component({
  selector: 'app-profile-target',
  templateUrl: './profile-target.component.html',
  styleUrls: ['./profile-target.component.css']
})
export class ProfileTargetComponent implements OnInit {
  user: User;
  target: Target;
  editMode = false;
  autoMode = true;
  actualWeight: number;
  dailyCalories = 0;
  dayActivity = 0
  trainingActivity = 0
  changePerWeek = 0
  estimatedCalories: number;
  proteinsResult: number;
  fatsResult: number;
  carbohydratesResult: number;
  weeksFromNow = 0;
  estimatedWeight = this.actualWeight;
  today = new Date();
  dateNextWeek = new Date(this.today.setDate(this.today.getDate() + 7));
  constructor(private userService: UserService, private targetService: TargetService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = user;
      this.user.parameters = this.user.parameters.sort((a, b) => (a.date < b.date) ? 1 : -1)

      if (this.user.parameters[0] == undefined) {

        this.actualWeight = this.user.target.weightFrom;
      } else {
        this.actualWeight = this.user.parameters[0].weight;
      }
      this.estimatedWeight = this.user.parameters[0].weight
    }, error => {
      this.alertify.error(error);
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    this.calculate();
    this.target = new Target();
    this.target.weightFrom = parseInt((<HTMLInputElement>document.getElementById('actualWeight')).value);
    this.target.weightTo = parseInt((<HTMLInputElement>document.getElementById('estimatedWeight')).value);
    this.target.estimatedEnd = new Date((<HTMLInputElement>document.getElementById('estimatedTime')).value);
    this.target.changePerWeek = this.changePerWeek;
    this.target.dayActivity = parseInt((<HTMLInputElement>document.getElementById('dayActivity')).value);
    this.target.trainingActivity = parseInt((<HTMLInputElement>document.getElementById('trainingActivity')).value);
    this.target.callories = Math.round(this.estimatedCalories);
    this.target.proteins = Math.round(this.proteinsResult);
    this.target.fats = 222;
    this.target.carbohydates = Math.round(this.carbohydratesResult);
    this.targetService.add(this.target).subscribe(next => {
      this.alertify.success('Target saved');
    }, error => {
      this.alertify.error(error);
    });

    this.toggleEdit();
  }

  calculate() {
    if (this.actualWeight == null) {
      var actualWeight = parseFloat((<HTMLInputElement>document.getElementById('actualWeight')).value);
    } else {
      var actualWeight = parseFloat((<HTMLInputElement>document.getElementById('actualWeight')).value);
    }
    // this.user.parameters[0].weight
    this.estimatedWeight = parseFloat((<HTMLInputElement>document.getElementById('estimatedWeight')).value);

    if (this.autoMode == true) {
      var changePerWeek = (this.estimatedWeight - actualWeight) / this.weeksBetween(new Date(), new Date((<HTMLInputElement>document.getElementById('estimatedTime')).value));
      this.changePerWeek = Math.round(changePerWeek * 7);
    } else {
      var changePerWeek = parseFloat((<HTMLInputElement>document.getElementById('changePerWeek')).value);
      this.changePerWeek = changePerWeek;
    }

    this.dayActivity = parseFloat((<HTMLInputElement>document.getElementById('dayActivity')).value);
    this.dayActivity = parseFloat((<HTMLInputElement>document.getElementById('dayActivity')).value);
    this.trainingActivity = parseFloat((<HTMLInputElement>document.getElementById('trainingActivity')).value);

    console.log(changePerWeek);
    var caloricDeficit = 7000 * changePerWeek;
    this.dailyCalories = (this.dayActivity * 0.2 + 1.1 + this.trainingActivity * 0.1)*actualWeight * 22;

    if (this.autoMode == true) {
      this.estimatedCalories = this.dailyCalories + caloricDeficit ;
    } else {
      if (actualWeight - this.estimatedWeight < 0) {
        this.estimatedCalories = this.dailyCalories + caloricDeficit / 7;
      } else if(actualWeight - this.estimatedWeight > 0) {
        this.estimatedCalories = this.dailyCalories - caloricDeficit / 7;
      } else {
        this.estimatedCalories = this.dailyCalories;
      }

      var daysToTarget = Math.abs(actualWeight - this.estimatedWeight) / changePerWeek * 7; console.log(daysToTarget);
    }

    if (this.estimatedCalories < 0) {
      this.estimatedCalories = 0;
    }
    this.proteinsResult = actualWeight * (this.dayActivity * 0.25 + 1.1 + (this.trainingActivity * this.trainingActivity * 0.005) + (this.trainingActivity + this.dayActivity)/10);
    this.fatsResult = actualWeight;
    this.carbohydratesResult = (this.estimatedCalories - (this.proteinsResult*4 + this.fatsResult*9))/4;
    console.log(this.proteinsResult);
  }

  weeksBetween(d1, d2) {
    return Math.round(Math.abs(d2 - d1) / (24 * 60 * 60 * 1000));
  }

  calculationTypeToggle() {
    var autoModeLabel = document.querySelector('.autoCalculation');
    var manualModeLabel = document.querySelector('.manualCalculation');

    if (autoModeLabel.querySelector('input').checked) {
      autoModeLabel.classList.remove('unselected');
      autoModeLabel.classList.add('selected');
      (<HTMLElement>autoModeLabel).style.color = '#000';
      (<HTMLElement>manualModeLabel).style.color = '#fff';
      this.autoMode = true;

    } else if (manualModeLabel.querySelector('input').checked){
      autoModeLabel.classList.remove('selected');
      autoModeLabel.classList.add('unselected');
      (<HTMLElement>autoModeLabel).style.color = '#fff';
      (<HTMLElement>manualModeLabel).style.color = '#000';
      this.autoMode = false;
    }
    console.log(this.autoMode);
    this.calculate();
  }
}
