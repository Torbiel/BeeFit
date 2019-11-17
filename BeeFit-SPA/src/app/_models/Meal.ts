import { User } from './User';
import { Dish } from './Dish';
import { Ingredient } from './Ingredient';

export class Meal {
    id?: number;
    type: number;
    date: Date;
    user: User;
    dish: Dish;
    dishId: number;
    ingredient: Ingredient;
    ingredientId: number;
    quantity?: number;
}