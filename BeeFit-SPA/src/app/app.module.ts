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
import { ProfileNavComponent } from './profile/profile-nav/profile-nav.component';
import { ProfileParametersComponent } from './profile/profile-parameters/profile-parameters.component';
import { WelcomeComponent } from './welcome/welcome.component';
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
      WelcomeComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forChild([
         { path: 'profile', component: ProfileNavComponent, children: [
            { path: 'main', component: ProfileMainComponent, outlet: 'profile' },
            { path: 'parameters', component: ProfileParametersComponent, outlet: 'profile'},
            { path: 'target', component: ProfileTargetComponent, outlet: 'profile' },
            { path: 'charts', component: ProfileChartsComponent, outlet: 'profile' },
            { path: '', redirectTo: 'main', pathMatch: 'full' }
         ]
      }]),
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
