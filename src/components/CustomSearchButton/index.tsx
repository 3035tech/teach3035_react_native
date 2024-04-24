import React from "react";
import { Image, TouchableOpacity, TouchableOpacityProps } from "react-native";
import image from "../../assets/recommended.png";
import {
    Content,
    Overlay,
    Row,
    SearchIcon,
    Subtitle,
    Title,
    InfoWrapper,
    Background,
    ArrowIcon,
} from "./styles";

type Props = TouchableOpacityProps;
export const CustomSearchButton = ({ ...props }: Props) => {
    return (
        <TouchableOpacity {...props}>
            <Background source={image} imageStyle={{ borderRadius: 10 }}>
                <Overlay />
                <Content>
                    <Row>
                        <SearchIcon name="search" size={20} />

                        <InfoWrapper>
                            <Title>Busca Personalizada</Title>
                            <Subtitle>
                                Encontre receitas com os ingredientes da sua
                                geladeira!
                            </Subtitle>
                        </InfoWrapper>
                    </Row>
                    <ArrowIcon name="chevron-forward" size={24} />
                </Content>
            </Background>
        </TouchableOpacity>
    );
};
