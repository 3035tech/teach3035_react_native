import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";

export const Container = styled.View<{ top: number }>`
    flex-direction: row;
    align-items: center;
    padding: 16px 24px;
    margin-top: ${({ top }) => top}px;
    gap: 10px;
`;

export const Content = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
`;
export const BackArrow = styled(Ionicons)`
    margin-right: ${({ theme }) => theme.spaces.lg};
`;

export const Title = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xl};
    color: ${(props) => props.theme.colors.gray900};
`;
