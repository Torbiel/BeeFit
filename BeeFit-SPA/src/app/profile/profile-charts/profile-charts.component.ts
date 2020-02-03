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
  title = 'Parameters';
  lessThanOrGreaterThan = 'lessThan';
  unit = 'day';
  filterLimit = 100;
  parametersChart;
  weight;
  bicepsCircumference;
  thighCircumference;
  abdominalCircumference;
  from = '0';
  dateTo;
  dateFrom;

  toMonth = '7';
  parametersDates;

  constructor(private userService: UserService, private alertify: AlertifyService) {

  }

  ngOnInit() {
      const id = localStorage.getItem('userId');
      this.userService.getUser(id).subscribe((user: User) => {
      this.weight = user.parameters.map(res => res.weight);
      this.bicepsCircumference = user.parameters.map(res => res.bicepsCircumference);
      this.thighCircumference = user.parameters.map(res => res.thighCircumference);
      this.abdominalCircumference = user.parameters.map(res => res.abdominalCircumference);
      const alldates = user.parameters.map(res => res.date);
      alldates.sort();
      this.parametersDates = [];
      alldates.forEach((date) => {
        const jsdate = new Date(date);
        this.parametersDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
      });

      Chart.defaults.global.defaultFontColor = 'white';

      this.parametersChart = new Chart('parameters', {
        type: 'line',
        data: {
          labels: this.parametersDates,
          datasets: [
            {
              label: 'Weight',
              data: this.weight,
              borderColor: '#F3C622',
              backgroundColor: '#F3C622',
              fill: false
            },
            {
              label: 'Thigh circumference',
              data: this.thighCircumference,
              borderColor: '#3cba9f',
              backgroundColor: '#3cba9f',
              fill: false
            },
            {
              label: 'Biceps circumference',
              data: this.bicepsCircumference,
              borderColor: '#992409',
              backgroundColor: '#992409',
              fill: false
            },
            {
              label: 'Abdominal circumference',
              data: this.abdominalCircumference,
              borderColor: '#8791A3',
              backgroundColor: '#8791A3',
              fill: false
            },
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Parameters',
            fontSize: 26
          },
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              type: 'time',
              distribution: 'linear',
              time: {
                unit: 'month',
                displayFormats: {
                  day: 'DD/MMM/YYYY',
                  week: 'DD/MM',
                  month: 'MM',
                  quarter: 'MMM DD',
                  year: 'MMM DD',
                }
              },
              scaleLabel: {
                display: true,
                labelString: 'Date'
              },
              display: true,
              gridLines: {
                display: true,
                color: '#333'
              },
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Kilograms or centimeters'
              },
              display: true,
              gridLines: {
                display: true,
                color: '#333'
              },
            }],
          }
        }
      });

    }, error => {
      this.alertify.error(error);
    });
  }

  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }

  updateChartData(chart, data, dataSetIndex) {
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
  }

  applyFilter(value) {

    this.parametersChart.data.datasets[0].data = this.weight;
    this.parametersChart.data.datasets[1].data = this.bicepsCircumference;
    this.parametersChart.data.datasets[2].data = this.thighCircumference;
    this.parametersChart.data.datasets[3].data = this.abdominalCircumference;

    this.parametersChart.data.datasets.forEach((data, i) => {
      if (this.lessThanOrGreaterThan === 'greaterThan') {
        this.parametersChart.data.datasets[i].data = data.data.map(v => {
          if (v >= value) {
            return v;
          } else {
            return 0;
          }
        });
       // console.log(">>>>>>>>", this.parametersChart.data.datasets[i].data);
      } else {
        this.parametersChart.data.datasets[i].data = data.data.map(v => {
          if (v <= value) {
            return v;
          } else {
            return 0;
          }
        });
        // console.log("?????????", this.parametersChart.data.datasets[i].data);
      }
    });
    this.parametersChart.update();
  }

    applyDateFilter() {
      this.parametersChart.data.labels = this.getDatesRange(new Date(this.from), new Date(this.toMonth));
      this.parametersChart.update();
    }

    applyUnitFilter(unit) {
      this.parametersChart.options.scales.xAxes[0].time.unit = unit;
      this.parametersChart.update();
    }

  getDatesRange(startDate, endDate) {
    let dates = [],
        currentDate = startDate,
        addDays = function(days) {
          let date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

    setDateFrom(date: Date) {
    this.dateFrom = date.toString().substr(0, 10);
    if (this.dateTo < this.dateFrom && this.dateTo.length !== 0) {
      this.dateTo = this.dateFrom;
     (document.getElementsByName('dateTo')[0] as HTMLInputElement).value  = this.dateFrom.toString();
    }
  }

  setDateTo(date: Date) {
    this.dateTo = date.toString().substr(0, 10);
    if (this.dateTo < this.dateFrom && this.dateFrom.length === 0 || this.dateTo < this.dateFrom && this.dateTo.length !== 0) {
      this.dateFrom = this.dateTo;
      (document.getElementsByName('dateFrom')[0] as HTMLInputElement).value  = this.dateTo.toString();
    }
  }
}
