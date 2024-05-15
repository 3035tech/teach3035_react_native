import React from "react";
import { Header } from "../../components/Header";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";
import { ActivityIndicator, FlatList } from "react-native";
import { Container, IngredientsContainer, NoResultsFound } from "./styles";
import { Chip } from "../../components/Chip";
import { RECIPES } from "../../mocks/recipes";
import { RecipeCard } from "../../components/RecipeCard";
import { usePagination } from "../../hooks/usePagination";
import {
    collection,
    orderBy,
    query,
    startAfter,
    where,
    limit,
    getDocs,
    getCountFromServer,
    deleteField,
    updateDoc,
    doc,
} from "firebase/firestore";
import { db } from "../../libs/firebase";
import { Recipe } from "../../models/Recipe";
import { FirebaseRecipe } from "../../libs/firebase/models/recipes";
import { useUser } from "../../hooks/useUser";

type Props = StackScreenProps<RootStackParamList, "CustomSearchList">;

export const CustomSearchList = ({ navigation, route: { params } }: Props) => {
    const { ingredients } = params;
    const [user] = useUser();
    console.log(ingredients, "ingredients");
    const {
        data,
        fetchNextPageData,
        isLoading,
        isLoadingElementsCount,
        updateElement,
    } = usePagination({
        getDataFn: async (lastDoc) => {
            const q = query(
                collection(db, "recipes"),
                where("ingredients", "array-contains-any", ingredients),
                orderBy("name"),
                startAfter(lastDoc),
                limit(6)
            );
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map<Recipe>((doc) => {
                const data = doc.data() as FirebaseRecipe;

                return {
                    ...data,
                    imageUri: data.mainImageUri,
                    isFavorited: data.favoritedBy[user!?.uid],
                    id: doc.id,
                };
            });

            return {
                data,
                lastDoc: snapshot.docs[snapshot.docs.length - 1],
            };
        },

        getTotalElements: async () => {
            const q = query(
                collection(db, "recipes"),
                where("ingredients", "array-contains-any", ingredients)
            );

            const count = await getCountFromServer(q);

            return count.data().count;
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
                ListEmptyComponent={
                    !isLoading && !isLoadingElementsCount ? (
                        <NoResultsFound>
                            Nenhum resultado encontrado
                        </NoResultsFound>
                    ) : null
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
                                !!item.isFavorited,
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
