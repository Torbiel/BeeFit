import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TargetService } from 'src/app/_services/target.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/User';
import { Target } from 'src/app/_models/Target';
import { empty } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { now } from 'moment';

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
  dailyCallories = 0;
  dayActivity = 0;
  trainingActivity = 0;
  changePerWeek = 0;
  proteinsResult = 0;
  fatsResult = 0;
  carbohydratesResult = 0;
  weeksFromNow = 0;
  targetWeight = this.actualWeight;
  today = new Date();
  totalPercent = 0;
  estimatedEnd = new Date();
  dayActivityText: String[] = [
    '1 — Sedentary Lifestyle.',
    '2 — Moderately Active Lifestyle.',
    '3 — Very Active Lifestyle.',
    '4 — Extra Active Lifestyle.'
  ];
  trainingActivityText: String[] = [
    '1 — Little or no exercise.',
    '2 — Moderate exercise or sports 3 - 5 days / week.',
    '3 — Hard exercise or sports 6 - 7 days / week.',
    '4 — Very hard exercise or sports 6 - 7 days / week.'
  ];
  proteinsPercent: any;
  carbohydratesPercent: any;
  fatsPercent: any;

  constructor(
    private userService: UserService,
    private targetService: TargetService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getUser();
    this.calculate();
  }

  getUser() {
    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe(
      (user: User) => {
        this.user = user;
        this.user.parameters = this.user.parameters.sort((a, b) =>
          a.date < b.date ? 1 : -1
        );

        if (this.user.parameters[0] !== undefined && this.user.parameters[0].weight) {
          this.actualWeight = this.user.parameters[0].weight;
        } else {
          this.actualWeight = this.user.target.weightFrom;
        }
        this.targetWeight = this.actualWeight;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    this.autoMode = true;
  }

  saveChanges() {
    this.calculate();
    this.target = new Target();
    this.target.weightFrom = parseInt(
      (document.getElementById('actualWeight') as HTMLInputElement).value,
      10
    );
    this.target.weightTo = parseInt(
      (document.getElementById('targetWeight') as HTMLInputElement).value,
      10
    );
    this.target.estimatedEnd = this.estimatedEnd;
    this.target.changePerWeek = this.changePerWeek;
    this.target.dayActivity = parseInt(
      (document.getElementById('dayActivity') as HTMLInputElement).value,
      10
    );
    this.target.trainingActivity = parseInt(
      (document.getElementById('trainingActivity') as HTMLInputElement).value,
      10
    );
    this.target.callories = this.dailyCallories;
    this.target.proteins = Math.round(this.proteinsResult);
    this.target.fats = Math.round(this.fatsResult);
    this.target.carbohydrates = Math.round(this.carbohydratesResult);

      if (this.user.target == null) {
        this.user.target = this.target;
        this.userService.updateUser(this.user).subscribe(
          () => {
            this.alertify.success('Target added.');
          }, error => {
            this.alertify.error(error);
          }
        );
      } else {
        this.target.id = this.user.target.id;
        this.targetService.update(this.user.target.id, this.target).subscribe(
          () => {
            this.alertify.success('Target updated.');
          }, error => {
            this.alertify.error(error);
          }
        );
      }

    this.user.target = this.target;

    this.toggleEdit();
  }

  calculate() {    
    this.actualWeight = Math.abs(parseFloat(
      (document.getElementById('actualWeight') as HTMLInputElement).value
    ));
   document.querySelectorAll('input[type="number"]').forEach((input) => {
      if (typeof((input as HTMLInputElement).value[0]) == 'undefined') {
      (input  as HTMLInputElement).value = '';
    }
   });
   
    // this.user.parameters[0].weight
    this.targetWeight = Math.abs(parseFloat(
      (document.getElementById('targetWeight') as HTMLInputElement).value
    ));

    this.changePerWeek = parseFloat(
      (document.getElementById('changePerWeek') as HTMLInputElement).value
    );

    this.dayActivity = parseFloat(
      (document.getElementById('dayActivity') as HTMLInputElement).value
    );
    this.dayActivity = parseFloat(
      (document.getElementById('dayActivity') as HTMLInputElement).value
    );
    this.trainingActivity = parseFloat(
      (document.getElementById('trainingActivity') as HTMLInputElement).value
    );

    let weightDifference = this.actualWeight - this.targetWeight;
    let caloricDeficit = 7000 * this.changePerWeek;
    if (weightDifference > 0) {
      caloricDeficit = (0 - caloricDeficit) / 7;
    } else if (weightDifference == 0) {
      caloricDeficit = 0;
      this.changePerWeek = 0;
    } else {
      caloricDeficit = caloricDeficit / 7;
    }

    const daysToTarget =
      (Math.abs(this.actualWeight - this.targetWeight) / this.changePerWeek) *
      7;

    if (this.autoMode === true) {
      if (this.user.height && this.user.dateOfBirth && this.user.gender) {
        if (this.user.gender == 1) {//male
          this.dailyCallories = (
            9.99 * this.actualWeight +
            6.25 * this.user.height -
            4.92 * (this.today.getUTCFullYear() - new Date(this.user.dateOfBirth).getUTCFullYear()) +
            5
          ) * (this.dayActivity * 0.15 + 1 + this.trainingActivity * 0.15) +
          caloricDeficit;
        } else {//female
          this.dailyCallories = (
            9.99 * this.actualWeight +
            6.25 * this.user.height -
            4.92 * (this.today.getUTCFullYear() - new Date(this.user.dateOfBirth).getUTCFullYear()) -
             161
          ) * (this.dayActivity * 0.15 + 1 + this.trainingActivity * 0.15) +
          caloricDeficit;
        }
      } else {
        this.dailyCallories =
          (this.dayActivity * 0.15 + 1 + this.trainingActivity * 0.15) *
          this.actualWeight * 22 + caloricDeficit;
      }

      if (weightDifference > 0) {//proteins value depending on weight lost or gain
          this.proteinsResult =
            this.actualWeight *
            (this.dayActivity * 0.2 +
              1.2 +
              this.trainingActivity * this.trainingActivity * 0.005 +
              (this.trainingActivity + this.dayActivity) / 10);
        } else {
          this.proteinsResult =
            this.actualWeight *
            (this.dayActivity * 0.2 +
              1.0 +
              this.trainingActivity * this.trainingActivity * 0.005 +
              (this.trainingActivity + this.dayActivity) / 10);
        }

      this.fatsResult = this.dailyCallories * 0.25 / 9;

      this.carbohydratesResult =
        (this.dailyCallories -
          (this.proteinsResult * 4 + this.fatsResult * 9)) /
        4;
    } else {
      this.dailyCallories = parseFloat(
        (document.getElementById('dailyCallories') as HTMLInputElement).value
      );
      this.proteinsPercent = parseFloat(
        (document.getElementById('proteins') as HTMLInputElement).value
      );
      this.proteinsResult = this.proteinsPercent * this.dailyCallories / 400;
      this.fatsPercent = parseFloat(
        (document.getElementById('fats') as HTMLInputElement).value
      );
      this.fatsResult = this.fatsPercent * this.dailyCallories / 900;
      this.carbohydratesPercent = parseFloat(
        (document.getElementById('carbohydrates') as HTMLInputElement).value
      );
      this.carbohydratesResult = this.carbohydratesPercent * this.dailyCallories / 400;

      if (Number.isNaN(this.proteinsPercent)) {
        this.proteinsPercent = 0;
      }
      if (Number.isNaN(this.fatsPercent)) {
        this.fatsPercent = 0;
      }
      if (Number.isNaN(this.carbohydratesPercent)) {
        this.carbohydratesPercent = 0;
      }
      this.totalPercent = this.proteinsPercent + this.fatsPercent + this.carbohydratesPercent;
    }
    this.dailyCallories = Math.round(this.dailyCallories);

    (<HTMLInputElement>document.querySelector('#dayActivityValue')).value = (this.dayActivityText[parseInt((<HTMLInputElement>document.querySelector('#dayActivity')).value) - 1]).toString();
    (<HTMLInputElement>document.querySelector('#trainingActivityValue')).value = (this.trainingActivityText[parseInt((<HTMLInputElement>document.querySelector('#trainingActivity')).value) - 1]).toString();
    this.estimatedEnd = new Date();
    if (weightDifference) {
       this.estimatedEnd.setDate(this.estimatedEnd.getDate() + daysToTarget);
    } 
  }

  weeksBetween(d1: Date, d2: Date) {
    return Math.round(
      Math.abs(d2.valueOf() - d1.valueOf()) / (24 * 60 * 60 * 1000)
    );
  }

  calculationTypeToggle() {
    const autoModeLabel = document.querySelector('.autoCalculation');
    const manualModeLabel = document.querySelector('.manualCalculation');

    if (autoModeLabel.querySelector('input').checked) {
      autoModeLabel.classList.remove('unselected');
      autoModeLabel.classList.add('selected');
      (autoModeLabel as HTMLElement).style.color = '#000';
      (manualModeLabel as HTMLElement).style.color = '#fff';
      this.autoMode = true;
    } else if (manualModeLabel.querySelector('input').checked) {
      autoModeLabel.classList.remove('selected');
      autoModeLabel.classList.add('unselected');
      (autoModeLabel as HTMLElement).style.color = '#fff';
      (manualModeLabel as HTMLElement).style.color = '#000';
      this.autoMode = false;
    }

    this.calculate();
  }
}
