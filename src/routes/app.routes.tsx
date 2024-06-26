import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainTabs, TabNavigationParamsList } from "./mainTabs.routes";
import { CustomSearch } from "../screens/CustomSearch";
import { CustomSearchList } from "../screens/CustomSearchList";
import { AllRecipes } from "../screens/AllRecipes";
import { Categories } from "../screens/Categories";
import { RecipeList } from "../screens/RecipeList";
import { Search } from "../screens/Search";
import { RecipeInfo } from "../screens/RecipeInfo";
import { RecipeDifficulty } from "../constants/recipeDifficulty";

type NewType = NavigatorScreenParams<TabNavigationParamsList>;

export type RootStackParamList = {
    MainTabs: NewType | undefined;
    CustomSearch: undefined;
    CustomSearchList: {
        ingredients: string[];
    };
    AllRecipes?: {
        searchTerm?: string;
        difficulties?: ("EASY" | "MEDIUM" | "HARD")[];
    };
    Categories: undefined;
    RecipeList: {
        difficulties?: ("EASY" | "MEDIUM" | "HARD")[];
        category: string;
        searchTerm?: string;
    };
    Search: {
        defaultSearchTerm?: string;
        callbackScreen: keyof RootStackParamList;
        difficulties?: RecipeDifficulty[];
        category?: string;
    };
    RecipeInfo: {
        recipeName: string;
        recipeId: string;
    };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppRootStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: false,
                headerShown: false,
            }}
            initialRouteName="MainTabs"
        >
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="CustomSearch" component={CustomSearch} />
            <Stack.Screen
                name="CustomSearchList"
                component={CustomSearchList}
            />
            <Stack.Screen name="AllRecipes" component={AllRecipes} />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="RecipeList" component={RecipeList} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="RecipeInfo" component={RecipeInfo} />
        </Stack.Navigator>
    );
};

export default AppRootStack;
