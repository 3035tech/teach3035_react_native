import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    Container,
    Header,
    Name,
    SearchContainer,
    StyledCustomSearchButton,
    Welcome,
} from "./styles";

import { ScrollView, Image, View } from "react-native";

import avatar from "../../assets/avatar.png";
import React from "react";
import { SearchInput } from "../../components/SearchInput";
import { CustomSearchButton } from "../../components/CustomSearchButton";
export const Home = () => {
    const insets = useSafeAreaInsets();

    return (
        <Container topInset={insets.top}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header>
                    <Image source={avatar} />
                    <View>
                        <Name>Olá, Jonas!</Name>
                        <Welcome>Qual receita vamos aprender hoje?</Welcome>
                    </View>
                </Header>
                <SearchContainer>
                    <SearchInput placeholder="Pesquisar receitas" />
                </SearchContainer>
                <StyledCustomSearchButton />
            </ScrollView>
        </Container>
    );
};
