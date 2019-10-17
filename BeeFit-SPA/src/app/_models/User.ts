import { SearchPreference } from './SearchPreference';
import { Allergen } from './Allergen';
import { UsersParameter } from './UsersParameter';

export interface User {
    id: number;
    email: string;
    gender: number;
    height: number;
    dateOfBirth: Date;
    username: string;
    created?: Date;
    lastActive?: Date;
    deleted?: boolean;
    preferences?: SearchPreference[];
    allergens?: Allergen[];
    parameters?: UsersParameter[];
}
