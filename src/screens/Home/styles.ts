import { View } from "react-native";
import styled from "styled-components/native";
import { CustomSearchButton } from "../../components/CustomSearchButton";

export const Container = styled(View)<{ topInset: number }>`
    flex: 1;
    padding-top: ${({ topInset }) => topInset}px;
    background-color: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    padding: ${({ theme }) => `${theme.spaces.lg} ${theme.spaces.xxxl}`};

    gap: ${(props) => props.theme.spaces.xl};
`;

export const Name = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xl};
`;

export const Welcome = styled.Text`
    font-family: ${(props) => props.theme.fonts.medium};
    font-size: ${(props) => props.theme.fontSize.sm};
`;
export const SearchContainer = styled.View`
    margin: 0 45px;
`;

export const StyledCustomSearchButton = styled(CustomSearchButton)`
    margin: ${(props) => props.theme.spaces.lg}
        ${(props) => props.theme.spaces.xxl};
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${(props) => props.theme.spaces.lg};
    margin-top: ${(props) => props.theme.spaces.lg};
    margin-left: ${(props) => props.theme.spaces.xxxl};
`;

export const Title = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xl};
    color: ${(props) => props.theme.colors.gray900};
`;
