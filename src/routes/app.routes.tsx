import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainTabs, TabNavigationParamsList } from "./mainTabs.routes";
import { CustomSearch } from "../screens/CustomSearch";
import { CustomSearchList } from "../screens/CustomSearchList";

type NewType = NavigatorScreenParams<TabNavigationParamsList>;

export type RootStackParamList = {
    MainTabs: NewType | undefined;
    CustomSearch: undefined;
    CustomSearchList: {
        ingredients: string[];
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
        </Stack.Navigator>
    );
};

export default AppRootStack;
