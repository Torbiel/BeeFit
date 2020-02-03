import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule, MatTooltipModule } from '@angular/material';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
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
import { UserService } from './_services/user.service';
import { DishesService } from './_services/dishes.service';
import { IngredientsService } from './_services/ingredients.service';
import { MealService } from './_services/meal.service';
import { MealtypeService } from './_services/mealtype.service';
import { AlertifyService } from './_services/alertify.service';
import { MyFoodComponent } from './my-food/my-food.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SearchComponent } from './search/search.component';
import { InfoComponent } from './Info/Info.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IngredientListItemComponent } from './ingredient-list-item/ingredient-list-item.component';
import { DishListItemComponent } from './dish-list-item/dish-list-item.component';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { DishFormComponent } from './dish-form/dish-form.component';
import { TruncatePipe } from './_pipes/truncate.pipe'

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
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
      MyFoodComponent,
      CalendarComponent,
      SearchComponent,
      InfoComponent,
      DishListItemComponent,
      IngredientListItemComponent,
      DishListItemComponent,
      IngredientFormComponent,
      DishFormComponent,
      TruncatePipe
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forChild(profileRoutes),
      // RouterModule.forChild(addMealRoutes),
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      MatProgressBarModule,
      MatExpansionModule,
      MatTooltipModule,
      FormsModule,
      ReactiveFormsModule,
      FullCalendarModule,
      PaginationModule.forRoot(),
      Ng2SearchPipeModule
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
