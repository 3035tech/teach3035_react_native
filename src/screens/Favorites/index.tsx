import React from "react";
import { Container, NoResultsFound } from "./styles";
import { Header } from "../../components/Header";
import { FlatList } from "react-native";
import { RECIPES } from "../../mocks/recipes";
import { RecipeCard } from "../../components/RecipeCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/app.routes";

export const Favorites = () => {
    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

    const filteredRecipes = RECIPES.filter((recipe) => recipe.isFavorited);
    return (
        <Container>
            <Header title="Favoritos" />
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
                    <NoResultsFound>
                        Não há nenhuma receita favoritada
                    </NoResultsFound>
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
                            navigate("RecipeInfo", {
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
