import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.colors.white};
`;

export const NoResultsFound = styled.Text`
    font-size: ${(props) => props.theme.fontSize.sm};

    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.gray200};
    text-align: center;
    margin-left: ${({ theme }) => theme.spaces.xl};
`;
