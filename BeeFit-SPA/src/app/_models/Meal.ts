import { User } from './User';
import { Dish } from './Dish';
import { Ingredient } from './Ingredient';

export class Meal {
    id?: number;
    type: number;
    date: Date;
    user: User;
    dish: Dish;
    ingredient: Ingredient;
    quantity?: number;
}