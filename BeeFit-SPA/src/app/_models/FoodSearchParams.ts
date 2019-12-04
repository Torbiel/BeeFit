export class FoodSearchParams {
    name: string;
    userId: number;
    minCallories: number;
    maxCallories: number;
    minProteins: number;
    maxProteins: number;
    minFats: number;
    maxFats: number;
    minCarbohydrates: number;
    maxCarbohydrates: number;
    orderBy: FoodOrderBy;
    ascending: boolean;
    currentPage: number;
    itemsPerPage: number;
}

export enum FoodOrderBy {
    Name = 0,
    Callories,
    Fats,
    Proteins,
    Carbohydrates
}
