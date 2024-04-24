import { createStackNavigator } from "@react-navigation/stack";
import { Signin } from "../screens/Signin";
import { Signup } from "../screens/Signup";

export type AuthRoutesStackParamsList = {
    Signin: undefined;
    Signup: undefined;
};

const Auth = createStackNavigator<AuthRoutesStackParamsList>();

const AuthRoutes = () => {
    return (
        <Auth.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Signup"
        >
            <Auth.Screen name="Signin" component={Signin} />
            <Auth.Screen name="Signup" component={Signup} />
        </Auth.Navigator>
    );
};

export default AuthRoutes;
