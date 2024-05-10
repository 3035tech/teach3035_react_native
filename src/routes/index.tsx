import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./auth.routes";
import AppRootStack from "./app.routes";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../libs/firebase";

const Routes = () => {
    const [user, setUser] = useUser();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return unsubscribe;
    }, []);
    return (
        <NavigationContainer>
            {!user ? <AuthRoutes /> : <AppRootStack />}
        </NavigationContainer>
    );
};

export default Routes;
