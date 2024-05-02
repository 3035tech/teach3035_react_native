import React, { useState } from "react";
import { Header } from "../../components/Header";
import { FlatList } from "react-native";
import { RECIPES } from "../../mocks/recipes";
import { RecipeCard } from "../../components/RecipeCard";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";
import { Container, StyledSearchInput, NoResultsFound } from "./styles";

type Props = StackScreenProps<RootStackParamList, "AllRecipes">;
export const AllRecipes = ({ navigation, route: { params } }: Props) => {
    const searchTerm = params?.searchTerm || "";

    const filteredRecipes = RECIPES.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <Header
                onBack={() => {
                    navigation.goBack();
                }}
                title="Todas as receitas"
            />
            <StyledSearchInput
                editable={false}
                placeholder="Digite o ingrediente para buscar"
                value={searchTerm}
                onPress={() => {
                    navigation.navigate("Search", {
                        callbackScreen: "AllRecipes",
                    });
                }}
                blurOnSubmit
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
                ListEmptyComponent={
                    <NoResultsFound>Não há nenhuma receita</NoResultsFound>
                }
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
                        onPress={() =>
                            navigation.navigate("RecipeInfo", {
                                recipeId: item.id,
                                recipeName: item.name,
                            })
                        }
                    />
                )}
            />
        </Container>
    );
};
