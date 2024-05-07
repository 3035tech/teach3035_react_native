import styled from "styled-components/native";
import { Input } from "../../components/Input";
import Ionicons from "react-native-vector-icons/Ionicons";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
    flex: 1;
    padding: ${({ theme }) => `${theme.spaces.xxl} ${theme.spaces.xxl}`};
`;

export const Description = styled.Text`
    font-family: ${(props) => props.theme.fonts.medium};
    font-size: ${(props) => props.theme.fontSize.md};
    margin-bottom: ${({ theme }) => theme.spaces.xl};

    border-bottom-width: 1px;
    border-bottom-color: rgba(181, 181, 181, 0.5);

    padding-bottom: ${(props) => props.theme.spaces.md};
`;

export const StyledInput = styled(Input)`
    flex: 1;
`;

export const Dot = styled.View`
    background: ${(props) => props.theme.colors.primary};
    height: 20px;
    width: 20px;

    border-radius: 10px;

    align-items: center;
    justify-content: center;

    margin-top: ${(props) => props.theme.spaces.lg};
`;

export const Item = styled.View<{ center?: boolean }>`
    flex-direction: row;
    gap: ${(props) => props.theme.spaces.sm};
    align-items: ${(props) => (props.center ? "center" : "flex-start")};
    margin-bottom: ${(props) => props.theme.spaces.xl};
`;

export const Order = styled.Text`
    color: ${(props) => props.theme.colors.white};
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xs};
`;

export const AddFieldText = styled.Text`
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.primary};
    font-family: ${(props) => props.theme.fonts.bold};

    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.primary};
    text-align: center;
`;

export const Title = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xl};
    color: ${(props) => props.theme.colors.gray900};
    margin-bottom: ${({ theme }) => theme.spaces.lg};
`;

export const CloseIcon = styled(Ionicons)`
    margin-top: ${(props) => props.theme.spaces.lg};
`;
