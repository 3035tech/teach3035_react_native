import React from "react";
import { MessageContainer, MessageText } from "./styles";
import { StyleProp, ViewStyle } from "react-native";

type Props = {
    children: string;
    style?: StyleProp<ViewStyle>;
};

export const ToastMessage = ({ children, style }: Props) => {
    return (
        <MessageContainer style={style}>
            <MessageText>{children}</MessageText>
        </MessageContainer>
    );
};
