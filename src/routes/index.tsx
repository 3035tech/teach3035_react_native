import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./auth.routes";
import AppRootStack from "./app.routes";

const Routes = () => {
    return (
        <NavigationContainer>
            {/* <AuthRoutes /> */}
            <AppRootStack />
        </NavigationContainer>
    );
};

export default Routes;
