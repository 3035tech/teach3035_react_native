import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackArrow, Container, Content, RightSide, Title } from "./styles";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    mode?: "light" | "dark";
    title: string;
    onBack?: () => void;
    logout?: boolean;
};
export const Header = ({ title, onBack, mode = "dark", logout }: Props) => {
    const { top } = useSafeAreaInsets();
    return (
        <Container top={top}>
            <Content>
                {onBack ? (
                    <BackArrow
                        name="arrow-back"
                        size={25}
                        color="#F98549"
                        onPress={onBack}
                    />
                ) : null}
                <Title mode={mode}>{title}</Title>

                {logout ? (
                    <RightSide>
                        <Ionicons
                            name="exit-outline"
                            size={25}
                            color="#F98549"
                            onPress={() => {}}
                        />
                    </RightSide>
                ) : null}
            </Content>
        </Container>
    );
};
