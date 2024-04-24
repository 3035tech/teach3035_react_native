import { createStackNavigator } from "@react-navigation/stack";
import { Signin } from "../screens/Signin";
import { Signup } from "../screens/Signup";
import { OnboardingFirstPage } from "../screens/Onboarding/FirstPage";
import { OnboardingSecondPage } from "../screens/Onboarding/SecondPage";
import { OnboardingThirdPage } from "../screens/Onboarding/ThirdPage";

export type AuthRoutesStackParamsList = {
    Signin: undefined;
    Signup: undefined;
    OnboardingFirstPage: undefined;
    OnboardingSecondPage: undefined;
    OnboardingThirdPage: undefined;
};

const Auth = createStackNavigator<AuthRoutesStackParamsList>();

const AuthRoutes = () => {
    return (
        <Auth.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="OnboardingFirstPage"
        >
            <Auth.Screen name="Signin" component={Signin} />
            <Auth.Screen name="Signup" component={Signup} />
            <Auth.Screen
                name="OnboardingFirstPage"
                component={OnboardingFirstPage}
            />
            <Auth.Screen
                name="OnboardingSecondPage"
                component={OnboardingSecondPage}
            />
            <Auth.Screen
                name="OnboardingThirdPage"
                component={OnboardingThirdPage}
            />
        </Auth.Navigator>
    );
};

export default AuthRoutes;
