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
import { DiaryComponent } from './diary/diary.component';
import { appRoutes } from './routes';
import { ProfileComponent } from './profile/profile.component';
import { WelcomeComponent } from './welcome/welcome.component';

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
      DiaryComponent,
      ProfileComponent,
      WelcomeComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
