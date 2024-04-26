import styled from "styled-components/native";
import { SearchInput } from "../../components/SearchInput";

export const StyledSearchInput = styled(SearchInput)`
    margin: ${(props) => props.theme.spaces.xxxl};
    margin-bottom: ${(props) => props.theme.spaces.lg};
`;
