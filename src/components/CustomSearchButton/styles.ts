import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

export const Background = styled.ImageBackground`
    position: relative;
`;
export const Overlay = styled.View`
    width: 100%;
    height: 100%;
    border-radius: 10px;

    background-color: rgba(0, 0, 0, 0.5);

    position: absolute;
    top: 0;
`;

export const Content = styled.View`
    padding: ${(props) => props.theme.spaces.lg};

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const Row = styled.View`
    flex-direction: row;
    gap: 12px;
`;

export const SearchIcon = styled(Ionicons)`
    color: ${({ theme }) => theme.colors.white};
`;

export const InfoWrapper = styled.View`
    margin-top: ${({ theme }) => theme.spaces.xxs};
`;

export const Title = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.lg};
    color: ${(props) => props.theme.colors.white};

    line-height: ${(props) => props.theme.spaces.xl};
    margin-bottom: ${(props) => props.theme.spaces.sm};
`;

export const Subtitle = styled.Text`
    font-family: ${(props) => props.theme.fonts.medium};
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.white};
    width: 60%;
    line-height: ${(props) => props.theme.spaces.lg};
`;
export const ArrowIcon = styled(Ionicons)`
    color: ${({ theme }) => theme.colors.white};
    position: absolute;
    right: 12px;
`;
