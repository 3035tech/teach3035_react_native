import styled from "styled-components/native";

type ContentProps = {
    isActive: boolean;
};

export const Container = styled.View`
    flex: 1;
    padding-bottom: ${({ theme }) => theme.spaces.xxl};
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.spaces.xxl};
`;

export const Title = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xxl};
    color: ${(props) => props.theme.colors.gray900};
`;

export const ButtonContainer = styled.View`
    padding: ${({ theme }) => `${theme.spaces.lg} ${theme.spaces.xxl}`};
`;

export const Clear = styled.Text`
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.primary};
    font-family: ${(props) => props.theme.fonts.bold};
    margin-top: ${(props) => props.theme.spaces.sm};

    text-decoration: underline;
    text-align: center;
`;

export const AccordionHeader = styled.View`
    padding-top: ${(props) => props.theme.spaces.lg};
    padding-bottom: ${(props) => props.theme.spaces.lg};

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: #dfdfdf;
`;

export const AccordionTitle = styled.Text`
    font-family: ${(props) => props.theme.fonts.medium};
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.gray900};
`;

export const AccordionContent = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    gap: ${(props) => props.theme.spaces.xs};
    margin-top: ${(props) => props.theme.spaces.xs};
`;

export const DifficultyButton = styled.TouchableOpacity<ContentProps>`
    min-width: 90px;
    background: ${(props) =>
        props.isActive ? props.theme.colors.primary : props.theme.colors.white};
    padding: ${(props) => props.theme.spaces.xs};
    border-radius: 20px;
    border: 1px solid
        ${(props) =>
            props.isActive
                ? props.theme.colors.white
                : props.theme.colors.gray100};
`;

export const DifficultyText = styled.Text<ContentProps>`
    font-family: ${(props) => props.theme.fonts.regular};
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) =>
        props.isActive ? props.theme.colors.white : props.theme.colors.gray100};
    text-align: center;
`;
