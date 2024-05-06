import { createStackNavigator } from "@react-navigation/stack";
import { NewRecipeCreation } from "../screens/NewRecipeCreation";
import { SetRecipeInformation } from "../screens/SetRecipeInformation";
import { RecipeDifficulty } from "../models/Recipe";

export type CreateRecipeStackParamsList = {
    NewRecipeCreation: undefined;
    SetRecipeInformation: {
        name: string;
        description: string;
        category: string;
        difficulty: RecipeDifficulty;
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
        </Stack.Navigator>
    );
};

export default CreateRecipeStack;
