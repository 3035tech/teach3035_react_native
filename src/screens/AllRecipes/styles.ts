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

export const NoResultsFound = styled.Text`
    font-size: ${(props) => props.theme.fontSize.sm};

    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.gray200};
    text-align: center;
    margin-left: ${({ theme }) => theme.spaces.xl};
`;
