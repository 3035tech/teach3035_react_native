export type FirebaseRecipe = {
    name: string;
    calories: number;
    description: string;
    images: string[];
    category: string;
    mainImageUri: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    favoritedBy: Record<string, boolean>;
    preparationTime: number;
};
