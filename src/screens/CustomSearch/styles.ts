import styled from "styled-components/native";
import { SearchInput } from "../../components/SearchInput";

export const Container = styled.View`
    flex: 1;
    padding: ${({ theme }) => `${theme.spaces.xxl} ${theme.spaces.xxxl}`};
`;

export const Description = styled.Text`
    font-family: ${(props) => props.theme.fonts.medium};
    font-size: ${(props) => props.theme.fontSize.md};

    border-bottom-width: 1px;
    border-bottom-color: rgba(181, 181, 181, 0.5);

    padding-bottom: ${(props) => props.theme.spaces.md};
`;

export const IngredientLabel = styled.Text`
    font-family: ${(props) => props.theme.fonts.medium};
    font-size: ${(props) => props.theme.fontSize.md};
`;

export const IngredientsContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${(props) => props.theme.spaces.md};

    margin-top: ${(props) => props.theme.spaces.md};
`;

export const StyledSearchInput = styled(SearchInput)`
    margin-bottom: ${(props) => props.theme.spaces.lg};
    margin-top: ${(props) => props.theme.spaces.xxxl};
`;
