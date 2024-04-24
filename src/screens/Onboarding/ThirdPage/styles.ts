import styled from "styled-components/native";

export const Background = styled.ImageBackground`
    flex: 1;
    position: relative;
    justify-content: flex-end;
`;

export const Overlay = styled.View`
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;

    background-color: rgba(0, 0, 0, 0.75);
`;

export const TextContainer = styled.View`
    margin: 45px;
`;

export const Title = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xxxl};
    color: ${(props) => props.theme.colors.white};

    margin-bottom: ${(props) => props.theme.spaces.md};
`;

export const Info = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    font-size: ${(props) => props.theme.fontSize.md};
    color: ${(props) => props.theme.colors.white};

    line-height: ${(props) => props.theme.spaces.xxl};

    margin-bottom: 50px;
`;

export const Bold = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
`;
