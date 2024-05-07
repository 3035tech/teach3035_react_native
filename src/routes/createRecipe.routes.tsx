import { createStackNavigator } from "@react-navigation/stack";
import { NewRecipeCreation } from "../screens/NewRecipeCreation";
import { SetRecipeInformation } from "../screens/SetRecipeInformation";
import { RecipeDifficulty } from "../models/Recipe";
import { SetRecipeIngredients } from "../screens/SetRecipeIngredients";
import { SetIngredientsDescription } from "../screens/SetIngredientsDescription";
import { SetPreparationSteps } from "../screens/SetPreparationSteps";

export type CreateRecipeStackParamsList = {
    NewRecipeCreation: undefined;
    SetRecipeInformation: {
        name: string;
        description: string;
        category: string;
        difficulty: RecipeDifficulty;
    };
    SetRecipeIngredients: {
        name: string;
        description: string;
        category: string;
        difficulty: RecipeDifficulty;
        calories: number;
        preparationTime: number;
    };
    SetIngredientsDescription: {
        name: string;
        description: string;
        category: string;
        difficulty: RecipeDifficulty;
        calories: number;
        preparationTime: number;
        ingredients: string[];
    };
    SetPreparationSteps: {
        name: string;
        description: string;
        category: string;
        difficulty: RecipeDifficulty;
        calories: number;
        preparationTime: number;
        ingredients: string[];
        ingredientsDescription: string[];
    };
};

const Stack = createStackNavigator<CreateRecipeStackParamsList>();
const CreateRecipeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="NewRecipeCreation"
        >
            <Stack.Screen
                name="NewRecipeCreation"
                component={NewRecipeCreation}
            />
            <Stack.Screen
                name="SetRecipeInformation"
                component={SetRecipeInformation}
            />
            <Stack.Screen
                name="SetRecipeIngredients"
                component={SetRecipeIngredients}
            />
            <Stack.Screen
                name="SetIngredientsDescription"
                component={SetIngredientsDescription}
            />
            <Stack.Screen
                name="SetPreparationSteps"
                component={SetPreparationSteps}
            />
        </Stack.Navigator>
    );
};

export default CreateRecipeStack;
