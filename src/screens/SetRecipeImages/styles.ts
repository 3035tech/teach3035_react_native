import { Dimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";
import { ImageBackground as ExpoImageBackground, Image } from "expo-image";
import { SelectImageInput } from "../../components/SelectImageInput";
import { Button } from "../../components/Button";

const { height, width } = Dimensions.get("window");

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.white};
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

export const SelectImageContainer = styled.View`
    width: ${width - 48}px;
    height: ${height * 0.4}px;
    border-radius: 10px;
    background-color: #eee;
    border-width: 2px;
    border-style: dashed;
    border-color: ${({ theme }) => theme.colors.gray100};
    align-items: center;
    justify-content: center;
`;
export const SelectImageText = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: ${(props) => props.theme.fontSize.md};
    color: ${({ theme }) => theme.colors.primary};
`;

export const StyledSelectImageInput = styled(SelectImageInput)`
    margin-right: ${(props) => props.theme.spaces.xl};
`;

export const StyledButton = styled(Button)`
    margin: ${(props) => props.theme.spaces.lg};
`;
