import { User } from './User';
import { SearchPreference } from './SearchPreference';
import { Dish } from './Dish';

export class Ingredient {
    id: number;
    name: string;
    brand: string;
    user?: User;
    unit: number;
    gramsPerUnit: number;
    dishes?: Dish[];
    searchPreferences?: SearchPreference[];
    callories: number;
    fats: number;
    carbohydrates: number;
    sugars?: number;
    proteins: number;
    animalProteins?: number;
    plantProteins?: number;
    saturatedFats?: number;
    monounsaturatedFats?: number;
    polyunsaturatedFats?: number;
    omega3?: number;
    omega6?: number;
    fiber?: number;
    salt?: number;
    cholesterol?: number;
    vitaminA?: number;
    vitaminB1?: number;
    vitaminB2?: number;
    vitaminB5?: number;
    vitaminB6?: number;
    vitaminB7?: number;
    vitaminB9?: number;
    vitaminB12?: number;
    vitaminC?: number;
    vitaminD?: number;
    vitaminE?: number;
    vitaminPP?: number;
    vitaminK?: number;
    zinc?: number;
    phosphorus?: number;
    iodine?: number;
    magnesium?: number;
    copper?: number;
    potassium?: number;
    selenium?: number;
    sodium?: number;
    calcium?: number;
    iron?: number;

    constructor(data: JSON) {
        Object.assign(this, data);
    }
}
