import React, { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Label, StyledActivityIndicator } from "./styles";

type Props = TouchableOpacityProps & {
    children: ReactNode;
    onPress: () => void;
    isLoading?: boolean;
};

export const Button = ({ children, onPress, isLoading }: Props) => {
    return (
        <Container onPress={onPress}>
            {!isLoading ? (
                <Label>{children}</Label>
            ) : (
                <StyledActivityIndicator size="small" />
            )}
        </Container>
    );
};
