import { Dish } from './Dish';
import { Ingredient } from './Ingredient';

export class DishesIngredient {
    dish?: Dish;
    dishId: number;
    ingredient?: Ingredient;
    ingredientId: number;
    quantity: number;
}