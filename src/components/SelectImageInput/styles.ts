import { ImageBackground } from "expo-image";
import { Dimensions, View } from "react-native";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("window");

export const SelectImageText = styled.Text<{ isInvalid: boolean }>`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.md};
    color: ${({ theme, isInvalid }) =>
        !isInvalid ? theme.colors.primary : theme.colors.error};
`;

export const SelectImageContainer = styled(View)<{ isInvalid: boolean }>`
    width: ${width - 48}px;
    height: ${height * 0.4}px;
    border-radius: 10px;
    background-color: ${({ theme, isInvalid }) =>
        !isInvalid ? "#eee" : "#fcc"};
    border-width: 2px;
    border-style: dashed;
    border-color: ${({ theme, isInvalid }) =>
        !isInvalid ? theme.colors.gray100 : theme.colors.error};
    align-items: center;
    justify-content: center;
`;

export const RecipeImage = styled(ImageBackground)`
    overflow: hidden;
    width: ${width - 48}px;
    height: ${height * 0.4}px;
    border-radius: 10px;
    border-width: 1px;
    border-color: ${(props) => props.theme.colors.white};
`;

export const ErrorMessage = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.error};
    margin-bottom: ${(props) => props.theme.spaces.xs};
    margin-top: ${(props) => props.theme.spaces.md};
`;
