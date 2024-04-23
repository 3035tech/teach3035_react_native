import styled from "styled-components/native";

export const InputContainer = styled.View`
    margin-bottom: ${(props) => props.theme.spaces.lg};
`;

export const InputField = styled.TextInput<{ isValid: boolean }>`
    padding: ${(props) => props.theme.spaces.lg};
    border-radius: 10px;
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.gray100};
    border: 1px solid
        ${(props) =>
            props.isValid
                ? props.theme.colors.gray100
                : props.theme.colors.error};
`;

export const Label = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.gray900};
    margin-bottom: ${(props) => props.theme.spaces.xs};
`;

export const ErrorMessage = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.error};
    margin-bottom: ${(props) => props.theme.spaces.xs};
    margin-top: ${(props) => props.theme.spaces.md};
`;
