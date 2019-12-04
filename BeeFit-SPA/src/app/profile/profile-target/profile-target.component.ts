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
  dailyCallories: number = 0;
  dayActivity = 0;
  trainingActivity = 0;
  changePerWeek = 0;
  proteinsResult: number = 0;
  fatsResult: number = 0;
  carbohydratesResult: number = 0;
  weeksFromNow = 0;
  targetWeight = this.actualWeight;
  today = new Date();
  totalPercent: number = 0;
  estimatedEnd = new Date();
  dateNextWeek = new Date(this.today.setDate(this.today.getDate() + 7));
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

        if (this.user.parameters[0] === undefined) {
          this.actualWeight = this.user.target.weightFrom;
        } else {
          this.actualWeight = this.user.parameters[0].weight;
        }
        this.targetWeight = this.user.parameters[0].weight;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  toggleEdit() {
    this.editMode = !this.editMode;
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
    this.target.fats = 222;
    this.target.carbohydrates = Math.round(this.carbohydratesResult);

    if (this.user.target == null) {
      // this.targetService.add(this.target).subscribe(
      //   () => {
      //     this.alertify.success('Target added.');
      //   },
      //   error => {
      //     this.alertify.error(error);
      //   }
      // );
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
    this.actualWeight = parseFloat(
      (document.getElementById('actualWeight') as HTMLInputElement).value
    );

    // this.user.parameters[0].weight
    this.targetWeight = parseFloat(
      (document.getElementById('targetWeight') as HTMLInputElement).value
    );

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

    var weightDifference = this.actualWeight - this.targetWeight;
    var caloricDeficit = 7000 * this.changePerWeek;
    if (weightDifference > 0) {
      caloricDeficit = (0 - caloricDeficit) / 7;
    } else if (weightDifference == 0) {
      caloricDeficit = 0;
    } else {
      caloricDeficit = caloricDeficit / 7;
    }

    const daysToTarget =
      (Math.abs(this.actualWeight - this.targetWeight) / this.changePerWeek) *
      7;

    if (this.autoMode === true) {
      if (this.user.height && this.user.gender && this.user.dateOfBirth) {
        if (this.user.gender == 1) {
          this.dailyCallories = 66 + 13.7 * this.actualWeight + 5 * this.user.height - 6.76 * (this.today.getDate() - this.user.dateOfBirth.getDate())
        } else {
          this.dailyCallories = 655 + 9.6 * this.actualWeight + 1.8 * this.user.height - 4.7 * (this.today.getDate() - this.user.dateOfBirth.getDate())
        }
      } else {
        this.dailyCallories =
          (this.dayActivity * 0.2 + 1.1 + this.trainingActivity * 0.1) *
          this.actualWeight * 22 + caloricDeficit;
      }


      this.proteinsResult =
        this.actualWeight *
        (this.dayActivity * 0.25 +
          1.1 +
          this.trainingActivity * this.trainingActivity * 0.005 +
          (this.trainingActivity + this.dayActivity) / 10);

      this.fatsResult = this.actualWeight;

      this.carbohydratesResult =
        (this.dailyCallories - (this.proteinsResult * 4 + this.fatsResult * 9)) /
        4;
    } else {
      this.dailyCallories = parseFloat(
        (document.getElementById('dailyCallories') as HTMLInputElement).value
      );
      var proteinsPercent = parseFloat(
        (document.getElementById('proteins') as HTMLInputElement).value
      );
      this.proteinsResult = proteinsPercent * this.dailyCallories / 400;
      var fatsPercent = parseFloat(
        (document.getElementById('fats') as HTMLInputElement).value
      );
      this.fatsResult = fatsPercent * this.dailyCallories / 900;
      var carbohydratesPercent = parseFloat(
        (document.getElementById('carbohydrates') as HTMLInputElement).value
      );
      this.carbohydratesResult = carbohydratesPercent * this.dailyCallories / 400;

      this.totalPercent = proteinsPercent + fatsPercent + carbohydratesPercent;
      if (this.totalPercent == NaN) {
        this.totalPercent = 0;
      }
    }

    this.estimatedEnd = new Date();
    this.estimatedEnd.setDate(this.estimatedEnd.getDate() + daysToTarget);


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
