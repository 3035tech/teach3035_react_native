import styled from "styled-components/native";
import { ImageBackground as ExpoImageBackground, Image } from "expo-image";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export const Container = styled.View`
    flex: 1;
    background: ${(props) => props.theme.colors.white};
`;

export const ImageBackground = styled(ExpoImageBackground)`
    position: relative;
    margin-bottom: ${(props) => props.theme.spaces.lg};
`;

export const Overlay = styled.View`
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    background-color: rgba(0, 0, 0, 0.4);

    position: absolute;
    top: 0;
`;

export const RecipeImage = styled(Image)`
    width: 330px;

    height: ${height * 0.4}px;
    border-radius: 10px;
    border-width: 1px;
    border-color: ${(props) => props.theme.colors.white};
    margin-right: ${(props) => props.theme.spaces.lg};
`;

export const FavoriteIcon = styled(Icon)<{ isFavorited?: boolean }>`
    color: ${(props) =>
        props.isFavorited
            ? props.theme.colors.primary
            : props.theme.colors.white};

    align-self: flex-end;
`;

export const MainInfo = styled.View`
    flex-direction: column;
    padding: ${({ theme }) => theme.spaces.xxxl};
    padding-top: 0;
    gap: ${({ theme }) => theme.spaces.sm};
`;
export const Title = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xl};
    color: ${(props) => props.theme.colors.white};
`;

export const Description = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.white};

    margin-bottom: ${({ theme }) => theme.spaces.lg};
`;

export const GeneralInfo = styled.View`
    padding: ${(props) => props.theme.spaces.xl} 60px;
    flex-direction: row;
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 10px;
    justify-content: space-between;

    gap: ${(props) => props.theme.spaces.xl};

    position: absolute;
    align-self: center;
    bottom: -30px;

    shadow-color: rgba(0, 0, 0, 0.4);
    shadow-opacity: 1;
    shadow-radius: 21px;
    elevation: 10;
`;
export const Row = styled.View`
    flex-direction: row;
    gap: ${(props) => props.theme.spaces.sm};
    align-items: center;
`;
export const DetailText = styled.Text`
    text-align: center;
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.gray900};
`;
export const MaterialIcon = styled(MaterialCommunityIcons)``;

export const AccordionContainer = styled.View`
    margin: ${(props) => props.theme.spaces.xxl} 40px;
`;
export const Item = styled.TouchableOpacity`
    flex-direction: row;
    gap: ${(props) => props.theme.spaces.sm};
    align-items: flex-start;
    margin-bottom: ${(props) => props.theme.spaces.xl};
`;

export const Selection = styled.View<{ isSelected: boolean }>`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.primary};
    background-color: ${(props) =>
        props.isSelected ? props.theme.colors.primary : "transparent"};
`;

export const IngredientLabel = styled.Text`
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fonts.regular};
    font-size: ${(props) => props.theme.fontSize.xs};
    line-height: ${(props) => props.theme.spaces.lg};
`;

export const Dot = styled.View`
    background: ${(props) => props.theme.colors.primary};
    height: 20px;
    width: 20px;

    border-radius: 10px;

    align-items: center;
    justify-content: center;
`;

export const Order = styled.Text`
    color: ${(props) => props.theme.colors.white};
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.xs};
`;
