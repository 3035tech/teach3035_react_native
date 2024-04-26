import React from "react";
import { Header } from "../../components/Header";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";
import { FlatList } from "react-native";
import { IngredientsContainer } from "./styles";
import { Chip } from "../../components/Chip";
import { RECIPES } from "../../mocks/recipes";
import { RecipeCard } from "../../components/RecipeCard";

type Props = StackScreenProps<RootStackParamList, "CustomSearchList">;

export const CustomSearchList = ({ navigation, route: { params } }: Props) => {
    const { ingredients } = params;
    return (
        <>
            <Header
                onBack={() => navigation.goBack()}
                title="Busca Personalizada"
            />
            <FlatList
                ListHeaderComponent={
                    <IngredientsContainer>
                        {ingredients.map((ingredient, index) => (
                            <Chip key={ingredient} label={ingredient} />
                        ))}
                    </IngredientsContainer>
                }
                contentContainerStyle={{
                    padding: 12,
                    gap: 12,
                }}
                columnWrapperStyle={{
                    gap: 12,
                }}
                keyExtractor={(item) => String(item.id)}
                numColumns={2}
                data={RECIPES}
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
            />
        </>
    );
};
