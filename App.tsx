import Theme from "./src/themes";
import Routes from "./src/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <Theme>
                    <BottomSheetModalProvider>
                        <StatusBar
                            barStyle="light-content"
                            backgroundColor="#F98549"
                        />
                        <Routes />
                    </BottomSheetModalProvider>
                </Theme>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
