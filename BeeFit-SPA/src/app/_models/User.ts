import { SearchPreference } from './SearchPreference';
import { UsersParameter } from './UsersParameter';
import { Target } from './Target';

export interface User {
    id: number;
    email: string;
    gender: number;
    height: number;
    dateOfBirth: Date;
    username?: string;
    created?: Date;
    lastActive?: Date;
    deleted?: boolean;
    preferences?: SearchPreference[];
    parameters?: UsersParameter[];
    target: Target;
    oldPassword: string;
    newPassword: string;
}
