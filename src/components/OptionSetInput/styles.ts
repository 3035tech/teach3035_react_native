import styled from "styled-components/native";

export const Container = styled.View`
    margin-bottom: ${(props) => props.theme.spaces.lg};
`;

export const Label = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.gray900};
    margin-bottom: ${(props) => props.theme.spaces.sm};
`;

export const ContentWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
`;

export const ErrorMessage = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.error};
    margin-bottom: ${(props) => props.theme.spaces.xs};
    margin-top: ${(props) => props.theme.spaces.md};
`;

export const Content = styled.View<{ isActive: boolean; isInvalid: boolean }>`
    min-width: 70px;
    background-color: ${(props) =>
        props.isActive ? props.theme.colors.primary : props.theme.colors.white};
    padding: ${(props) => props.theme.spaces.xs};
    border-radius: 20px;

    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    gap: ${(props) => props.theme.spaces.xs};

    border: ${(props) =>
        !props.isInvalid
            ? props.isActive
                ? props.theme.colors.white
                : props.theme.colors.gray100
            : props.theme.colors.error};
`;

export const ContentText = styled.Text<{ isActive: boolean }>`
    font-family: ${(props) => props.theme.fonts.regular};
    font-size: ${(props) => props.theme.fontSize.sm};

    color: ${(props) =>
        props.isActive ? props.theme.colors.white : props.theme.colors.gray100};
    text-align: center;
`;
