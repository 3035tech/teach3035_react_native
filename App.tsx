import Theme from "./src/themes";
import Routes from "./src/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Home } from "./src/screens/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <Theme>
                    {/*  <Routes /> */}
                    <Home />
                </Theme>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
