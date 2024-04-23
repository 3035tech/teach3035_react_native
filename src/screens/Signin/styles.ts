import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";

export const Logo = styled(SvgXml)`
    flex: 1;
    margin-top: ${(props) => props.theme.spaces.xxl};
    align-self: center;
`;

export const Background = styled.View`
    background: ${(props) => props.theme.colors.primary};
    flex: 1;
`;

export const Card = styled.View`
    background: ${(props) => props.theme.colors.white};
    flex: 1;
    border-top-right-radius: 45px;
    border-top-left-radius: 45px;
    padding: 48px;
`;

export const Title = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xxl};
    color: ${(props) => props.theme.fontSize.gray900};

    margin-bottom: ${(props) => props.theme.spaces.xxxl};
`;

export const Bottom = styled.View`
    margin-top: ${(props) => props.theme.spaces.xxxl};
    flex: 1;
    justify-content: space-between;
`;
export const Row = styled.View`
    margin-top: ${(props) => props.theme.spaces.xxxl};
    bottom: 0;
    gap: 4px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
export const CreateAccount = styled.Text`
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.gray200};
    font-family: ${(props) => props.theme.fonts.regular};
    text-align: center;
`;

export const LinkText = styled.Text`
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.gray200};
    font-family: ${(props) => props.theme.fonts.regular};
    text-align: center;
    text-decoration-line: underline;
`;
