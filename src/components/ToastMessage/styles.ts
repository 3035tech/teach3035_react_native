import styled from "styled-components/native";

export const MessageContainer = styled.View`
    background: ${(props) => props.theme.colors.secondary};
    border-radius: 20px;
    text-align: center;
`;

export const MessageText = styled.Text`
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    padding: ${(props) => props.theme.spaces.sm};
    font-family: ${(props) => props.theme.fonts.regular};
`;
