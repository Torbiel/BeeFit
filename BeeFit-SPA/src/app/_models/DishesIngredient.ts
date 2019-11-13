import { Dish } from './Dish';
import { Ingredient } from './Ingredient';

export interface DishesIngredient {
    dish: Dish;
    dishId: number;
    ingredient: Ingredient;
    ingredientId: number;
    quantity: number;
}