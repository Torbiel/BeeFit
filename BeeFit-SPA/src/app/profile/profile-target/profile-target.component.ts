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
  dailyCallories = 0;
  dayActivity = 0;
  trainingActivity = 0;
  changePerWeek = 0;
  estimatedCalories: number;
  proteinsResult: number;
  fatsResult: number;
  carbohydratesResult: number;
  weeksFromNow = 0;
  targetWeight = this.actualWeight;
  today = new Date();
  estimatedEnd = new Date();
  dateNextWeek = new Date(this.today.setDate(this.today.getDate() + 7));
  constructor(
    private userService: UserService,
    private targetService: TargetService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getUser();
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
    // if (this.autoMode === true) {
    //   const changePerWeek =
    //     (this.targetWeight - this.actualWeight) /
    //     this.weeksBetween(
    //       new Date(),
    //       new Date(
    //         (document.getElementById('estimatedTime') as HTMLInputElement).value
    //       )
    //     );
    //   this.changePerWeek = Math.round(changePerWeek * 7);
    // } else {
    //   const changePerWeek = parseFloat(
    //     (document.getElementById('changePerWeek') as HTMLInputElement).value
    //   );
    //   this.changePerWeek = changePerWeek;
    // }

    this.dayActivity = parseFloat(
      (document.getElementById('dayActivity') as HTMLInputElement).value
    );
    this.dayActivity = parseFloat(
      (document.getElementById('dayActivity') as HTMLInputElement).value
    );
    this.trainingActivity = parseFloat(
      (document.getElementById('trainingActivity') as HTMLInputElement).value
    );

    // const caloricDeficit = 7000 * this.changePerWeek;
    this.dailyCallories =
      (this.dayActivity * 0.2 + 1.1 + this.trainingActivity * 0.1) *
      this.actualWeight *
      22;

    // if (this.autoMode === true) {
    //   this.estimatedCalories = this.dailyCallories + caloricDeficit;
    // } else {
    //   if (this.actualWeight - this.targetWeight < 0) {
    //     this.estimatedCalories = this.dailyCallories + caloricDeficit / 7;
    //   } else if (this.actualWeight - this.targetWeight > 0) {
    //     this.estimatedCalories = this.dailyCallories - caloricDeficit / 7;
    //   } else {
    //     this.estimatedCalories = this.dailyCallories;
    //   }
    // }

    const daysToTarget =
      (Math.abs(this.actualWeight - this.targetWeight) / this.changePerWeek) *
      7;
    this.estimatedEnd = new Date();
    this.estimatedEnd.setDate(this.estimatedEnd.getDate() + daysToTarget);

    if (this.estimatedCalories < 0) {
      this.estimatedCalories = 0;
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
