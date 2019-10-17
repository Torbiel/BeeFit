import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodaysPlanComponent } from './todays-plan/todays-plan.component';
import { HelpComponent } from './help/help.component';
import { DiaryComponent } from './diary/diary.component';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '', // This path is added to the children path
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'diary', component: DiaryComponent },
            { path: 'calendar', component: CalendarComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'todays-plan', component: TodaysPlanComponent },
        ]
    },
    { path: 'help', component: HelpComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];