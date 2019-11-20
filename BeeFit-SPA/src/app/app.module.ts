import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { CalendarComponent } from './calendar/calendar.component';
import { TodaysPlanComponent } from './todays-plan/todays-plan.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { appRoutes, profileRoutes } from './routes';
import { ProfileMainComponent } from './profile/profile-main/profile-main.component';
import { ProfileParametersComponent } from './profile/profile-parameters/profile-parameters.component';
import { ProfileNavComponent } from './profile/profile-nav/profile-nav.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ProfileTargetComponent } from './profile/profile-target/profile-target.component';
import { ProfileChartsComponent } from './profile/profile-charts/profile-charts.component';
import { AddMealNavComponent } from './add-meal/add-meal-nav/add-meal-nav.component';
import { AddMealSearchComponent } from './add-meal/add-meal-search/add-meal-search.component';
import { AddMealMyFoodComponent } from './add-meal/add-meal-my-food/add-meal-my-food.component';
import { UserService } from './_services/user.service';
import { DishesService } from './_services/dishes.service';
import { IngredientsService } from './_services/ingredients.service';
import { MealService } from './_services/meal.service';
import { MealtypeService } from './_services/mealtype.service';
import { AlertifyService } from './_services/alertify.service';
import { AddDishComponent } from './add-dish/add-dish.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { MyFoodComponent } from './my-food/my-food.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      CalendarComponent,
      TodaysPlanComponent,
      TodaysPlanComponent,
      AboutComponent,
      HelpComponent,
      ProfileMainComponent,
      ProfileNavComponent,
      ProfileParametersComponent,
      ProfileTargetComponent,
      ProfileChartsComponent,
      WelcomeComponent,
      DatePickerComponent,
      AddMealNavComponent,
      AddMealSearchComponent,
      AddMealMyFoodComponent,
      AddDishComponent,
      AddIngredientComponent,
      MyFoodComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forChild(profileRoutes),
      // RouterModule.forChild(addMealRoutes),
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      UserService,
      DishesService,
      IngredientsService,
      MealService,
      MealtypeService,
      AlertifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
