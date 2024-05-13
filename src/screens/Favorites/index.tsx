import React, { useEffect, useState } from "react";
import { Container, NoResultsFound } from "./styles";
import { Header } from "../../components/Header";
import { FlatList } from "react-native";
import { RecipeCard } from "../../components/RecipeCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/app.routes";
import {
    collection,
    deleteField,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { useUser } from "../../hooks/useUser";
import { db } from "../../libs/firebase";
import { Recipe } from "../../models/Recipe";
import { FirebaseRecipe } from "../../libs/firebase/models/recipes";

export const Favorites = () => {
    const [loading, setLoading] = useState(false);
    const [favoritedRecipes, setFavoritedRecipes] = useState<Recipe[]>([]);

    const [user] = useUser();

    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

    const getFavoritedRecipes = async () => {
        try {
            setLoading(true);

            const recipesCollection = collection(db, "recipes");

            const filteredRecipes = query(
                recipesCollection,
                where(`favoritedBy.${user?.uid}`, "==", true)
            );

            const recipes = await getDocs(filteredRecipes);

            const data = recipes.docs.map<Recipe>((item) => {
                const recipe = item.data() as FirebaseRecipe;

                return {
                    ...recipe,
                    imageUri: recipe?.images?.[0],
                    isFavorited: true,
                    id: item.id,
                };
            });
            setFavoritedRecipes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const handleRemoveFavorite = async (recipeId: string) => {
        try {
            await updateDoc(doc(db, "recipes", recipeId), {
                [`favoritedBy.${user?.uid}`]: deleteField(),
            });

            getFavoritedRecipes();
        } catch (error) {}
    };

    useEffect(() => {
        getFavoritedRecipes();
    }, []);

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
                data={favoritedRecipes}
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
                        isFavorited={!!item.isFavorited}
                        preparationTime={item.preparationTime}
                        onFavoritePress={() => handleRemoveFavorite(item.id)}
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
