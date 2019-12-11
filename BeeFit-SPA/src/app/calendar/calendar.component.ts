import { Component, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { MealService } from '../_services/meal.service';
import { Meal } from '../_models/Meal';
import { DayNutrients } from '../_models/DayNutrients';
import { DateService } from '../_services/date.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  date = new Date();

  infoTextCalendar = 'You can navigate to detailed plan of a day by clicking on the date tile.';

  constructor(private router: Router, private mealService: MealService, private dateService: DateService) {
    const daysLength = this.getCurrentMonthLength(this.date.getMonth(), this.date.getFullYear());
    const days = new Array<Date>(daysLength);

    for (let i = 1; i < days.length + 1; i++) {
      days[i - 1] = new Date(this.date.getFullYear(), this.date.getMonth(), i);
    }

    const dayNutrients = new Array<DayNutrients>(daysLength);
    let index = 0;

    // for each date in the current month we get meals and create DayNutrients object
    days.forEach(date => {
      this.mealService.getManyByDate(date).subscribe((res) => {
        dayNutrients[index] = new DayNutrients();
        dayNutrients[index].date = date;
        dayNutrients[index].callories = 0;
        dayNutrients[index].proteins = 0;
        dayNutrients[index].fats = 0;
        dayNutrients[index].carbohydrates = 0;

        // for each meal on that date we add the nutrients to overral nutrients on this date
        res.forEach(meal => {
          if (meal.dish) {
            dayNutrients[index].callories += meal.dish.callories;
            dayNutrients[index].proteins += meal.dish.proteins;
            dayNutrients[index].fats += meal.dish.fats;
            dayNutrients[index].carbohydrates += meal.dish.carbohydrates;
          }

          if (meal.ingredient) {
            dayNutrients[index].callories += meal.ingredient.callories;
            dayNutrients[index].proteins += meal.ingredient.proteins;
            dayNutrients[index].fats += meal.ingredient.fats;
            dayNutrients[index].carbohydrates += meal.ingredient.carbohydrates;
          }
        });

        index++;
      });
    });
  }

  ngOnInit() {}

  getCurrentMonthLength(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  handleDateClick(event: any) {
    this.dateService.changeDate(new Date(event.date));
    this.router.navigate(['/days-plan', event.dateStr]);
  }
}
