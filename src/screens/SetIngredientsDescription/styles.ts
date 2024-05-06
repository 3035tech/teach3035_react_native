import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
    flex: 1;
    padding: ${({ theme }) => `${theme.spaces.xxl} ${theme.spaces.xxl}`};
`;

export const Title = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xl};
    color: ${(props) => props.theme.colors.gray900};
    margin-bottom: ${({ theme }) => theme.spaces.lg};
`;

export const Description = styled.Text`
    font-family: ${(props) => props.theme.fonts.medium};
    font-size: ${(props) => props.theme.fontSize.md};

    border-bottom-width: 1px;
    border-bottom-color: rgba(181, 181, 181, 0.5);

    padding-bottom: ${(props) => props.theme.spaces.md};
`;

export const IngredientName = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.md};
`;

export const IngredientsContainer = styled.View`
    margin-top: ${({ theme }) => theme.spaces.lg};
`;
