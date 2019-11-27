import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Chart } from 'chart.js';
import { UsersParameter } from 'src/app/_models/UsersParameter';

@Component({
  selector: 'app-profile-charts',
  templateUrl: './profile-charts.component.html',
  styleUrls: ['./profile-charts.component.css']
})
export class ProfileChartsComponent implements OnInit {
  @Input() public user: User;
  @Input() public UsersParameter: UsersParameter;
  chartsType: String = 'line';

  parameters = [];
  chart = [];

  constructor(private userService: UserService, private alertify: AlertifyService) {

  }
  ngOnInit() {
    this.generateCharts('line');
  }

  chartsTypeToggle() {
    var autoModeLabel = document.querySelector('.autoCalculation');
    var manualModeLabel = document.querySelector('.manualCalculation');

    if (autoModeLabel.querySelector('input').checked) {
      autoModeLabel.classList.remove('unselected');
      autoModeLabel.classList.add('selected');
      (<HTMLElement>autoModeLabel).style.color = '#000';
      (<HTMLElement>manualModeLabel).style.color = '#fff';
      this.chartsType = 'line';
      this.generateCharts(this.chartsType,2);

    } else if (manualModeLabel.querySelector('input').checked) {
      autoModeLabel.classList.remove('selected');
      autoModeLabel.classList.add('unselected');
      (<HTMLElement>autoModeLabel).style.color = '#fff';
      (<HTMLElement>manualModeLabel).style.color = '#000';
      this.chartsType = 'bar';
      this.generateCharts(this.chartsType);
    }
  }

  generateCharts(chartsType: String) {
    this.chartsType = chartsType;
    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe((user: User) => {
      let weight = user['parameters'].map(res => res.weight);
      let bicepsCircumference = user['parameters'].map(res => res.bicepsCircumference);
      let thighCircumference = user['parameters'].map(res => res.thighCircumference);
      let abdominalCircumference = user['parameters'].map(res => res.abdominalCircumference);
      let alldates = user['parameters'].map(res => res.date)
      alldates.sort();
      let weatherDates = []
      alldates.forEach((date) => {
        let jsdate = new Date(date)
        weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
      })

      Chart.defaults.global.defaultFontColor = 'white';

      this.chart = new Chart('canvas', {
        type: chartsType,
        data: {
          labels: weatherDates,
          datasets: [
            {
              label: 'Weight',
              data: weight,
              borderColor: "#F3C622",
              backgroundColor: '#F3C622',
              fill: false
            },
            {
              label: 'Thigh circumference',
              data: thighCircumference,
              borderColor: "#3cba9f",
              backgroundColor: "#3cba9f",
              fill: false
            },
            {
              label: 'Biceps circumference',
              data: bicepsCircumference,
              borderColor: "#992409",
              backgroundColor: "#992409",
              fill: false
            },
            {
              label: 'Abdominal circumference',
              data: abdominalCircumference,
              borderColor: "#8791A3",
              backgroundColor: "#8791A3",
              fill: false
            },
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              type: 'time',
              distribution: 'linear',
              time: {
                unit: 'week',
                unitStepSize: 1,
                displayFormats: {
                  'day': 'DD/MMM/YYYY',
                  'week': 'DD/MM',
                  'month': 'MM',
                  'quarter': 'MMM DD',
                  'year': 'MMM DD',
                }
              },
              scaleLabel: {
                display: true,
                labelString: 'Date'
              },
              display: true,
              gridLines: {
                display: true,
                color: "#333"
              },
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Kilograms or meters'
              },
              display: true,
              gridLines: {
                display: true,
                color: "#333"
              },
            }],
          }
        }
      });

    }, error => {
      this.alertify.error(error);
    });
  }



}
