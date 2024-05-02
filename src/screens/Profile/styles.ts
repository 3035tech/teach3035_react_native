import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.colors.white};
`;

export const Content = styled.View`
    padding: ${(props) => props.theme.spaces.xxxl};
`;

export const InputContainer = styled.View`
    margin-top: ${(props) => props.theme.spaces.xxl};
    border-bottom-width: 1px;
    border-bottom-color: #dfdfdf;
`;

export const Label = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.gray900};
`;

export const Input = styled.TextInput<{ blocked?: boolean }>`
    font-family: ${(props) => props.theme.fonts.regular};
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) =>
        props.blocked
            ? props.theme.colors.gray300
            : props.theme.colors.gray900};
    padding: ${(props) => props.theme.spaces.md};
`;
