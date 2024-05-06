import { TextInput } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const Container = styled.View`
    flex: 1;
`;

export const Label = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.gray900};
    margin-bottom: ${(props) => props.theme.spaces.md};
`;

export const LabelsContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: ${(props) => props.theme.spaces.xl};
`;

export const Value = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.gray900};
    font-size: ${(props) => props.theme.fontSize.sm};
`;

export const Input = styled(AnimatedTextInput)`
    color: ${(props) => props.theme.colors.primary};
    font-family: ${(props) => props.theme.fonts.medium};
    font-size: ${(props) => props.theme.fontSize.sm};
`;
