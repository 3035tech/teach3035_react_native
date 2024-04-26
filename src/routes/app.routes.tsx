import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainTabs, TabNavigationParamsList } from "./mainTabs.routes";

type NewType = NavigatorScreenParams<TabNavigationParamsList>;

export type RootStackParamList = {
    MainTabs: NewType | undefined;
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
        </Stack.Navigator>
    );
};

export default AppRootStack;
