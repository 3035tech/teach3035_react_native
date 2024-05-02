import { RECIPE_DIFFICULTY_MAP } from "../constants/recipeDifficulty";

export type RecipeDifficulty = keyof typeof RECIPE_DIFFICULTY_MAP;

export type Recipe = {
    id: number;
    name: string;
    calories: number;
    imageUri: string;
    description: string;
    category: string;
    difficulty: RecipeDifficulty;
    isFavorited?: boolean;
    preparationTime: number;
    images: string[];
    ingredients: string[];
    preparationSteps: string[];
};
