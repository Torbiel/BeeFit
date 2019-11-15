import { User } from './User';
import { Ingredient } from './Ingredient';

export class Dish {
    id: number;
    name: string;
    user: User;

    ingredients: DishesIngredient[];
    callories: number;

    public calculateCallories(): number {
        const callories = 0;

        this.ingredients.forEach(element => {
            element.ingredient.callories += callories;
        });

        this.callories = callories;
        return callories;
    }
}
