export type RecipeDifficulty = keyof typeof RECIPE_DIFFICULTY_MAP;

export const RECIPE_DIFFICULTY_MAP = {
    EASY: "Fácil",
    MEDIUM: "Médio",
    HARD: "Difícil",
} as const;
