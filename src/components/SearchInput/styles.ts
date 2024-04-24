import styled from "styled-components/native";

export const InputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors.gray100};

    gap: ${(props) => props.theme.spaces.xl};
    padding: ${(props) => `${props.theme.spaces.sm} 0px`};
`;

export const InputField = styled.TextInput`
    flex: 1;
    color: ${(props) => props.theme.colors.gray100};
    font-family: ${(props) => props.theme.fonts.regular};
    font-size: ${(props) => props.theme.fontSize.sm};
`;
