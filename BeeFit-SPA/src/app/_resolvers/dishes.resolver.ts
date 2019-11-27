import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Dish } from '../_models/Dish';
import { DishesService } from '../_services/dishes.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DishesResolver implements Resolve<Dish> {

    constructor(private dishesService: DishesService,
                private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Dish> {
        return this.dishesService.getById(route.params['dishId']).pipe(
            catchError(error => {
                this.alertify.error(error);
                return of(null);
            })
        );
    }
}
