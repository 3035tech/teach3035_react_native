import styled from "styled-components/native";

export const Container = styled.TouchableOpacity<{ disabled: boolean }>`
    background-color: ${(props) =>
        props.disabled
            ? props.theme.colors.gray100
            : props.theme.colors.primary};
    padding: ${(props) => props.theme.spaces.lg};
    border-radius: 10px;

    flex-direction: row;
    justify-content: center;

    shadow-color: rgba(0, 0, 0, 0.2);
    shadow-opacity: 1;
    shadow-radius: 21px;
    elevation: 5;
`;

export const Label = styled.Text`
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.white};
    font-family: ${(props) => props.theme.fonts.bold};
    text-align: center;
`;

export const StyledActivityIndicator = styled.ActivityIndicator.attrs(
    ({ theme }) => ({
        color: theme.colors.white,
    })
)``;
