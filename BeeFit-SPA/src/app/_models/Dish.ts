import { User } from './User';
import { DishesIngredient } from './DishesIngredient';

export class Dish {
    id: number;
    name: string;
    userId: number;
    ingredients: DishesIngredient[];
    callories: number;
    fats: number;
    carbohydrates: number;
    proteins: number;
    weight?: number;
}
