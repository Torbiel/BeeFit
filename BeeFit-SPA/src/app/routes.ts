import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodaysPlanComponent } from './todays-plan/todays-plan.component';
import { HelpComponent } from './help/help.component';
import { DiaryComponent } from './diary/diary.component';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProfileNavComponent } from './profile/profile-nav/profile-nav.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileMainComponent } from './profile/profile-main/profile-main.component';
import { ProfileParametersComponent } from './profile/profile-parameters/profile-parameters.component';
import { ProfileTargetComponent } from './profile/profile-target/profile-target.component';
import { ProfileChartsComponent } from './profile/profile-charts/profile-charts.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '', // This path is added to the children path
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'diary', component: DiaryComponent },
            { path: 'calendar', component: CalendarComponent },
            { path: 'todays-plan', component: TodaysPlanComponent },
            { path: 'profile', component: ProfileNavComponent },
            { path: 'welcome', component: WelcomeComponent }
        ]
    },
    { path: 'help', component: HelpComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const profileRoutes: Routes = [
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
];
