import React, { useState } from "react";
import { Header } from "../../components/Header";
import { FlatList } from "react-native";
import { RECIPES } from "../../mocks/recipes";
import { RecipeCard } from "../../components/RecipeCard";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";
import { StyledSearchInput } from "./styles";

type Props = StackScreenProps<RootStackParamList, "AllRecipes">;
export const AllRecipes = ({ navigation }: Props) => {
    const [search, setSearch] = useState("");

    return (
        <>
            <Header
                onBack={() => {
                    navigation.goBack();
                }}
                title="Todas as receitas"
            />
            <StyledSearchInput
                placeholder="Digite o ingrediente para buscar"
                value={search}
                onChangeText={setSearch}
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
