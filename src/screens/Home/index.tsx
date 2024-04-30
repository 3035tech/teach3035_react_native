import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import {
    Container,
    Header,
    Name,
    Row,
    SearchContainer,
    StyledCustomSearchButton,
    Title,
    Welcome,
} from "./styles";

import { ScrollView, Image, View, FlatList, Dimensions } from "react-native";

import avatar from "../../assets/avatar.png";
import React from "react";
import { SearchInput } from "../../components/SearchInput";
import { CategoryCard } from "../../components/CategoryCard";
import { RecipeCard } from "../../components/RecipeCard";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";
import { RECIPES } from "../../mocks/recipes";
import { CATEGORIES } from "../../mocks/categories";

type Props = StackScreenProps<RootStackParamList>;

export const Home = ({ navigation: { navigate } }: Props) => {
    const insets = useSafeAreaInsets();
    const { width } = Dimensions.get("window");
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
                    <SearchInput
                        editable={false}
                        placeholder="Pesquisar receitas"
                        onPress={() => {
                            navigate("Search", {
                                callbackScreen: "AllRecipes",
                            });
                        }}
                    />
                </SearchContainer>
                <StyledCustomSearchButton
                    onPress={() => navigate("CustomSearch")}
                />

                <Row onPress={() => navigate("Categories")}>
                    <Title> Categorias</Title>
                    <Icon name="chevron-forward" size={20} />
                </Row>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => String(item.id)}
                    data={CATEGORIES}
                    contentContainerStyle={{
                        paddingTop: 16,
                        paddingLeft: 20,
                        gap: 12,
                    }}
                    renderItem={({ item }) => (
                        <CategoryCard
                            categoryName={item.name}
                            imageUri={item.imageUri}
                            onPress={() => {}}
                        />
                    )}
                />

                <Row onPress={() => navigate("AllRecipes")}>
                    <Title>Descubra</Title>
                    <Icon name="chevron-forward" size={20} />
                </Row>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => String(item.id)}
                    data={RECIPES}
                    contentContainerStyle={{
                        paddingTop: 16,
                        paddingLeft: 20,
                        gap: 12,
                    }}
                    renderItem={({ item }) => (
                        <RecipeCard
                            style={{ width: width * 0.45 }}
                            id={String(item.id)}
                            name={item.name}
                            calories={item.calories}
                            imageUri={item.imageUri}
                            difficulty={item.difficulty}
                            isFavorited={item.isFavorited}
                            preparationTime={item.preparationTime}
                            onFavoritePress={() => console.log("favorito")}
                            onPress={() => console.log("onPress")}
                            heightVariant="small"
                        />
                    )}
                />
            </ScrollView>
        </Container>
    );
};
