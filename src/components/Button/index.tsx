import React, { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Label, StyledActivityIndicator } from "./styles";

type Props = TouchableOpacityProps & {
    children: ReactNode;
    onPress: () => void;
    isLoading?: boolean;
    disabled?: boolean;
};

export const Button = ({
    children,
    onPress,
    disabled,
    isLoading,
    ...props
}: Props) => {
    return (
        <Container onPress={onPress} disabled={!!disabled} {...props}>
            {!isLoading ? (
                <Label>{children}</Label>
            ) : (
                <StyledActivityIndicator size="small" />
            )}
        </Container>
    );
};
