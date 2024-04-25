import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Container = styled.ImageBackground`
    position: relative;

    border-radius: 20px;
    overflow: hidden;
    padding: ${(props) => props.theme.spaces.xs};
    justify-content: flex-end;

    width: ${width * 0.3}px;
    height: ${width * 0.5}px;
`;

export const Overlay = styled.View`
    width: ${width * 0.3}px;
    height: ${width * 0.5}px;

    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.4);

    position: absolute;
`;
export const Label = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.white};
    text-align: center;

    padding: 0px ${(props) => props.theme.spaces.xxs};

    border: 1px solid ${(props) => props.theme.colors.white};
    border-radius: 20px;
`;
