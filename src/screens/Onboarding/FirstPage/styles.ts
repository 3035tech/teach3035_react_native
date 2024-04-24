import styled from "styled-components/native";

export const Background = styled.ImageBackground`
    flex: 1;
    position: relative;
    justify-content: space-between;
`;

export const Overlay = styled.View`
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;

    background-color: rgba(0, 0, 0, 0.75);
`;

export const FilterContainer = styled.View`
    margin: 40% 40px;
`;

export const Category = styled.View`
    flex-direction: row;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors.white};
    padding-bottom: ${(props) => props.theme.spaces.md};
    margin-bottom: ${(props) => props.theme.spaces.md};
`;
export const Label = styled.Text`
    font-family: ${(props) => props.theme.fonts.medium};
    font-size: ${(props) => props.theme.fontSize.xl};
    color: ${(props) => props.theme.colors.white};
`;

export const ChipsContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${(props) => props.theme.spaces.md};
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
