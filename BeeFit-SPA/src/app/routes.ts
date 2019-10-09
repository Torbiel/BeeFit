import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodaysPlanComponent } from './todays-plan/todays-plan.component';
import { HelpComponent } from './help/help.component';
import { DiaryComponent } from './diary/diary.component';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'todays-plan', component: TodaysPlanComponent },
    { path: 'help', component: HelpComponent },
    { path: 'diary', component: DiaryComponent  },
    { path: 'about', component: AboutComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'profile', component: ProfileComponent},
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
