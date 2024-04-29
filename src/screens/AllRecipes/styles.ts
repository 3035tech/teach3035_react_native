import styled from "styled-components/native";
import { SearchInput } from "../../components/SearchInput";

export const Container = styled.View`
    flex: 1;
    background: ${(props) => props.theme.colors.white};
`;
export const StyledSearchInput = styled(SearchInput)`
    margin: ${(props) => props.theme.spaces.xxxl};
    margin-bottom: ${(props) => props.theme.spaces.lg};
`;
