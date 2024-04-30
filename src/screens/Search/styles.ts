import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background: ${(props) => props.theme.colors.white};
`;

export const SearchContainer = styled.View`
    margin: 0 ${({ theme }) => theme.spaces.xxxl};
`;
