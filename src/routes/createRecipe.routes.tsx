import { createStackNavigator } from "@react-navigation/stack";
import { NewRecipeCreation } from "../screens/NewRecipeCreation";
import { SetRecipeInformation } from "../screens/SetRecipeInformation";
import { RecipeDifficulty } from "../models/Recipe";
import { SetRecipeIngredients } from "../screens/SetRecipeIngredients";

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
        </Stack.Navigator>
    );
};

export default CreateRecipeStack;
