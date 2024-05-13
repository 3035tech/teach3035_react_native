import { RECIPE_DIFFICULTY_MAP } from "../constants/recipeDifficulty";

export type RecipeDifficulty = keyof typeof RECIPE_DIFFICULTY_MAP;

export type Recipe = {
    id: string;
    name: string;
    calories: number;
    description: string;
    imageUri: string;
    category: string;
    difficulty: RecipeDifficulty;
    isFavorited?: boolean;
    preparationTime: number;
};
