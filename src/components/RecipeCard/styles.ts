import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";

export const Container = styled.ImageBackground<{
    heightVariant: "large" | "small";
}>`
    position: relative;

    height: ${(props) => (props.heightVariant === "large" ? "288px" : "223px")};
    border-radius: 20px;
    overflow: hidden;
`;

export const Overlay = styled.View`
    height: 100%;
    width: 100%;

    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.6);

    position: absolute;
`;

export const Content = styled.View`
    flex: 1;
    justify-content: space-between;
    padding: ${(props) => props.theme.spaces.sm};
`;

export const FavoriteIcon = styled(Icon)<{ isFavorited: boolean }>`
    color: ${(props) =>
        props.isFavorited
            ? props.theme.colors.primary
            : props.theme.colors.white};

    align-self: flex-end;
`;

export const Title = styled.Text`
    text-align: left;
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.white};

    margin-bottom: ${(props) => props.theme.spaces.lg};
`;

export const Details = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: ${(props) => props.theme.spaces.xxs};

    border: 1px solid ${(props) => props.theme.colors.white};
    border-radius: 15px;
    padding: ${(props) => props.theme.spaces.md};
`;

export const Item = styled.View`
    flex-direction: row;
    gap: ${(props) => props.theme.spaces.xxs};
`;

export const Label = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xxxs};
    color: ${(props) => props.theme.colors.white};
`;
