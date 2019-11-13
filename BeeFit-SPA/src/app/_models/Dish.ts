import { User } from './User';
import { Ingredient } from './Ingredient';

export class Dish {
    id: number;
    name: string;
    user: User;
    ingredients: Ingredient[];
}
