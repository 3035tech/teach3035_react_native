import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Favorites } from "../screens/Favorites";

export type TabNavigationParamsList = {
    Favorites: undefined;
    Home: undefined;
    CreateRecipe: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabNavigationParamsList>();

export const MainTabs = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: "#8E8E8E",
                tabBarActiveTintColor: "#F6833C",
                tabBarStyle: {
                    height: insets.bottom + 70,
                    paddingBottom: insets.bottom + 10,
                },
                tabBarLabelStyle: {
                    marginTop: -15,
                    fontSize: 12,
                    fontWeight: "700",
                },
            }}
            initialRouteName="Home"
        >
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarLabel: "Favoritos",
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name={
                                color === "#F6833C" ? "heart" : "heart-outline"
                            }
                            size={20}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Início",
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name={color === "#F6833C" ? "home" : "home-outline"}
                            size={20}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="CreateRecipe"
                component={Home}
                options={{
                    tabBarLabel: "Criar",
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name={
                                color === "#F6833C"
                                    ? "add-circle"
                                    : "add-circle-outline"
                            }
                            size={20}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Home}
                options={{
                    tabBarLabel: "Perfil",
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name={
                                color === "#F6833C"
                                    ? "person"
                                    : "person-outline"
                            }
                            size={20}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
