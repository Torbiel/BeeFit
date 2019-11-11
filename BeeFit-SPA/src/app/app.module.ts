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
import { ProfileMainComponent } from './profile/profile-main/profile-main.component';
import { ProfileParametersComponent } from './profile/profile-parameters/profile-parameters.component';
import { ProfileNavComponent } from './profile/profile-nav/profile-nav.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ProfileTargetComponent } from './profile/profile-target/profile-target.component';
import { ProfileChartsComponent } from './profile/profile-charts/profile-charts.component';

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
      ProfileMainComponent,
      ProfileNavComponent,
      ProfileParametersComponent,
      ProfileTargetComponent,
      ProfileChartsComponent,
      WelcomeComponent,
      DatePickerComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forChild([
         {
            path: 'profile/main', component: ProfileNavComponent, children: [
               { path: '', component: ProfileMainComponent, outlet: 'profile' },
            ]
         },
         {
            path: 'profile/target', component: ProfileNavComponent, children: [
               { path: '', component: ProfileTargetComponent, outlet: 'profile' },
            ]
         },
         {
            path: 'profile/parameters', component: ProfileNavComponent, children: [
               { path: '', component: ProfileParametersComponent, outlet: 'profile' },
            ]
         },
         {
            path: 'profile/charts', component: ProfileNavComponent, children: [
               { path: '', component: ProfileChartsComponent, outlet: 'profile' },
            ]
         },
         { path: 'profile', component: ProfileNavComponent, children: [
            { path: '', pathMatch: 'full', redirectTo: '/profile/main' }
         ]
      },

   ]),

      RouterModule.forRoot(appRoutes),
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
