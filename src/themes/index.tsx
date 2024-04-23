import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
export const theme = {
    colors: {
        primary: "#F98549",
        secondary: "#F6833C",
        white: "#FFFFFF",
        gray900: "#303030",
        gray400: "#666666",
        gray300: "#8E8E8E",
        gray200: "#A09F9F",
        gray100: "#B5B5B5",
        error: "#de1515",
    },
    fonts: {
        bold: "Montserrat_700Bold",
        medium: "Montserrat_500Medium",
        regular: "Montserrat_400Regular",
    },
    fontSize: {
        xxxs: "8px",
        xxs: "10px",
        xs: "12px",
        sm: "15px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        xxl: "25px",
        xxxl: "30px",
    },
    spaces: {
        xxs: "4px",
        xs: "6px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        xxl: "24px",
        xxxl: "32px",
    },
};
const Theme = ({ children }: { children: ReactNode }) => {
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
    });

    if (!fontsLoaded) return null;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
