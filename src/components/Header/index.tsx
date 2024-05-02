import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackArrow, Container, Content, Title } from "./styles";

type Props = {
    mode?: "light" | "dark";
    title: string;
    onBack?: () => void;
};
export const Header = ({ title, onBack, mode = "dark" }: Props) => {
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
            </Content>
        </Container>
    );
};
