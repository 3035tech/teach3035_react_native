import styled from "styled-components/native";

export const AccordionHeader = styled.TouchableOpacity`
    padding-top: ${(props) => props.theme.spaces.lg};
    padding-bottom: ${(props) => props.theme.spaces.lg};

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: #dfdfdf;
`;

export const AccordionTitle = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.gray900};
`;

export const AccordionContent = styled.View`
    margin-top: ${(props) => props.theme.spaces.md};
`;
