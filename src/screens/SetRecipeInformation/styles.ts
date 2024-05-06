import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import { Button } from "../../components/Button";

export const Container = styled(KeyboardAvoidingView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xl};
    color: ${(props) => props.theme.colors.gray900};
    margin-bottom: ${({ theme }) => theme.spaces.lg};
`;

export const Content = styled.View`
    flex: 1;
    padding: 0 ${({ theme }) => theme.spaces.xl};
`;

export const StyledButton = styled(Button)`
    margin-bottom: ${({ theme }) => theme.spaces.lg};
`;
