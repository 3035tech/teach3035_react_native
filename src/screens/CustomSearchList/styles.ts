import styled from "styled-components/native";
import { RecipeCard } from "../../components/RecipeCard";

export const IngredientsContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${(props) => props.theme.spaces.md};

    margin-top: ${(props) => props.theme.spaces.md};
`;
