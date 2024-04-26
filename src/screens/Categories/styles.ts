import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`;

export const Row = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: ${(props) => props.theme.spaces.lg};
    margin-top: ${(props) => props.theme.spaces.lg};
    margin-left: ${(props) => props.theme.spaces.xxxl};
`;

export const Title = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xl};
    color: ${(props) => props.theme.colors.gray900};
`;

export const NoResultsFound = styled.Text`
    font-size: ${(props) => props.theme.fontSize.sm};

    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.gray200};
    text-align: center;
    margin-left: ${({ theme }) => theme.spaces.xl};
`;
