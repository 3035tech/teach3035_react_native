import React, { useState } from "react";
import { Header } from "../../components/Header";
import { ActivityIndicator, FlatList } from "react-native";
import { RecipeCard } from "../../components/RecipeCard";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";
import { Container, StyledSearchInput, NoResultsFound } from "./styles";
import { useUser } from "../../hooks/useUser";

import {
    collection,
    orderBy,
    query,
    getDocs,
    where,
    limit,
    startAfter,
    getCountFromServer,
    updateDoc,
    deleteField,
    doc,
} from "firebase/firestore";
import { usePagination } from "../../hooks/usePagination";
import { db } from "../../libs/firebase";
import { FirebaseRecipe } from "../../libs/firebase/models/recipes";
type Props = StackScreenProps<RootStackParamList, "AllRecipes">;
export const AllRecipes = ({ navigation, route: { params } }: Props) => {
    const [user] = useUser();
    const searchTerm = params?.searchTerm || "";
    const difficulties = params?.difficulties || [];

    const {
        data,
        isLoading,
        updateElement,
        fetchNextPageData,
        isLoadingElementsCount,
    } = usePagination({
        getDataFn: async (lastDoc) => {
            const q = query(
                collection(db, "recipes"),

                ...(difficulties && difficulties?.length > 0
                    ? [where("difficulty", "in", difficulties)]
                    : []),
                where("name", ">=", searchTerm),
                where("name", "<=", searchTerm + "\uf8ff"),
                orderBy("name"),
                startAfter(lastDoc),
                limit(6)
            );

            const snapshot = await getDocs(q);

            const recipes = snapshot.docs.map((doc) => {
                const data = doc.data() as FirebaseRecipe;

                return {
                    ...data,
                    imageUri: data.mainImageUri,
                    id: doc.id,
                    isFavorited: data.favoritedBy[user!?.uid],
                };
            });

            return {
                data: recipes,
                lastDoc: snapshot.docs[snapshot.docs.length - 1],
            };
        },

        getTotalElements: async () => {
            const q = query(
                collection(db, "recipes"),

                ...(difficulties && difficulties?.length > 0
                    ? [where("difficulty", "in", difficulties)]
                    : []),
                where("name", ">=", searchTerm),
                where("name", "<=", searchTerm + "\uf8ff")
            );

            const snapshot = await getCountFromServer(q);

            const count = snapshot.data().count;

            return count;
        },
    });

    const handlePressFavorite = async (
        recipeId: string,
        isFavorited: boolean,
        index: number
    ) => {
        try {
            if (isFavorited) {
                await updateDoc(doc(db, `recipes`, recipeId), {
                    [`favoritedBy.${user?.uid}`]: deleteField(),
                });
            } else {
                await updateDoc(doc(db, `recipes`, recipeId), {
                    [`favoritedBy.${user?.uid}`]: true,
                });
            }
            updateElement(index, {
                isFavorited: !isFavorited,
            });
        } catch (error) {
            console.error(error);
        }
    };
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
                data={data}
                ListEmptyComponent={
                    <NoResultsFound>Não há nenhuma receita</NoResultsFound>
                }
                ListFooterComponent={
                    isLoading || isLoadingElementsCount ? (
                        <ActivityIndicator color="#F98549" size="large" />
                    ) : null
                }
                onEndReached={() => {
                    if (!isLoading && !isLoadingElementsCount) {
                        fetchNextPageData();
                    }
                }}
                renderItem={({ item, index }) => (
                    <RecipeCard
                        id={String(item.id)}
                        name={item.name}
                        calories={item.calories}
                        imageUri={item.imageUri}
                        difficulty={item.difficulty}
                        isFavorited={!!item.isFavorited}
                        preparationTime={item.preparationTime}
                        onFavoritePress={() =>
                            handlePressFavorite(
                                item.id,
                                item.isFavorited,
                                index
                            )
                        }
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
