import { User } from './User';
import { SearchPreference } from './SearchPreference';
import { Dish } from './Dish';

export interface Ingredient {
    id: number;
    name: string;
    brand: string;
    user: User;
    unit: number;
    gramsPerUnit: number;
    dishes: Dish[];
    searchPreferences: SearchPreference[];
    callories: number;
    fats: number;
    carbohydrates: number;
    sugers: number;
    proteins: number;
}
