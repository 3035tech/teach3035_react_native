import styled from "styled-components/native";
export const Container = styled.View<{ variant: "solid" | "outline" }>`
    background: ${(props) =>
        props.variant === "solid" ? props.theme.colors.primary : "transparent"};

    border-color: ${(props) =>
        props.variant === "solid"
            ? props.theme.colors.primary
            : props.theme.colors.gray100};

    padding: ${(props) => `${props.theme.spaces.xs} ${props.theme.spaces.lg}`};
    border-radius: 20px;
    gap: ${(props) => props.theme.spaces.xl};

    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const Label = styled.Text<{ variant: "solid" | "outline" }>`
    font-family: ${(props) => props.theme.fonts.regular};
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${({ theme, variant }) =>
        variant === "solid" ? theme.colors.white : theme.colors.gray100};
`;
