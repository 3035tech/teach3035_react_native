import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { RECIPES } from "../../mocks/recipes";
import { RecipeCard } from "../../components/RecipeCard";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";
import { Header } from "../../components/Header";
import { Container, NoResultsFound, StyledSearchInput } from "./styles";

type Props = StackScreenProps<RootStackParamList, "RecipeList">;
export const RecipeList = ({ navigation, route: { params } }: Props) => {
    const { category } = params;
    const searchTerm = params?.searchTerm || "";
    console.log(searchTerm, "searchTerm");
    console.log(category, "category");

    const filteredRecipes = RECIPES.filter(
        (recipe) =>
            recipe.category === category &&
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <Container>
            <Header onBack={() => navigation.goBack()} title={category} />
            <StyledSearchInput
                value={searchTerm}
                editable={false}
                placeholder="Pesquisar receitas"
                onPress={() => {
                    navigation.navigate("Search", {
                        callbackScreen: "RecipeList",
                        category,
                    });
                }}
            />
            <FlatList
                contentContainerStyle={{
                    padding: 12,
                    gap: 12,
                }}
                columnWrapperStyle={{
                    gap: 12,
                }}
                keyExtractor={(item) => String(item.id)}
                numColumns={2}
                data={filteredRecipes}
                renderItem={({ item }) => (
                    <RecipeCard
                        id={String(item.id)}
                        name={item.name}
                        calories={item.calories}
                        imageUri={item.imageUri}
                        difficulty={item.difficulty}
                        isFavorited={item.isFavorited}
                        preparationTime={item.preparationTime}
                        onFavoritePress={() => console.log("favorito")}
                        onPress={() => console.log("onPress")}
                    />
                )}
                ListEmptyComponent={
                    <NoResultsFound>Não há nenhuma receita</NoResultsFound>
                }
            />
        </Container>
    );
};
