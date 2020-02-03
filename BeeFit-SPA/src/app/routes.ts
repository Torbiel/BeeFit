import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodaysPlanComponent } from './todays-plan/todays-plan.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProfileNavComponent } from './profile/profile-nav/profile-nav.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileMainComponent } from './profile/profile-main/profile-main.component';
import { ProfileParametersComponent } from './profile/profile-parameters/profile-parameters.component';
import { ProfileTargetComponent } from './profile/profile-target/profile-target.component';
import { ProfileChartsComponent } from './profile/profile-charts/profile-charts.component';
import { MyFoodComponent } from './my-food/my-food.component';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { DishFormComponent } from './dish-form/dish-form.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '', // This path is added to the children path
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'calendar', component: CalendarComponent },
            { path: 'days-plan/:date', component: TodaysPlanComponent },
            { path: 'profile', component: ProfileNavComponent },
            { path: 'welcome', component: WelcomeComponent },
            { path: 'my-food', component: MyFoodComponent, children: [
                { path: 'edit-dish/:id', component: DishFormComponent },
                { path: 'edit-ingredient/:id', component: IngredientFormComponent },
                { path: 'add-dish', component: DishFormComponent },
                { path: 'add-ingredient', component: IngredientFormComponent }
            ] },
            { path: '', component: MyFoodComponent }
        ]
    },
    { path: 'help', component: HelpComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }, // TODO: 404 page
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

// export const addMealRoutes: Routes = [
//     {
//         path: 'add-meal/search/:mealType', component: AddMealNavComponent, children: [
//             { path: '', component: AddMealSearchComponent, outlet: 'add-meal' }
//         ]
//     },
//     {
//         path: 'add-meal/my-food/:mealType', component: AddMealNavComponent, children: [
//             { path: '', component: AddMealMyFoodComponent, outlet: 'add-meal' }
//         ]
//     },
//     {
//         path: 'add-meal/add-new/:mealType', component: AddMealNavComponent, children: [
//             { path: '', component: AddMealAddNewComponent, outlet: 'add-meal' }
//         ]
//     }
// ];
