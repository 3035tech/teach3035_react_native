import { createStackNavigator } from "@react-navigation/stack";
import { NewRecipeCreation } from "../screens/NewRecipeCreation";

export type CreateRecipeStackParamsList = {
    NewRecipeCreation: undefined;
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
        </Stack.Navigator>
    );
};

export default CreateRecipeStack;
