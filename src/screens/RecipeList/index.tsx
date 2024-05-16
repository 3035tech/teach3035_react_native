import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { RecipeCard } from "../../components/RecipeCard";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";
import { Header } from "../../components/Header";
import { Container, NoResultsFound, StyledSearchInput } from "./styles";
import { usePagination } from "../../hooks/usePagination";
import {
    collection,
    getCountFromServer,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    where,
} from "firebase/firestore";
import { FirebaseRecipe } from "../../libs/firebase/models/recipes";
import { db } from "../../libs/firebase";
import { useUser } from "../../hooks/useUser";

type Props = StackScreenProps<RootStackParamList, "RecipeList">;
export const RecipeList = ({ navigation, route: { params } }: Props) => {
    const [user] = useUser();
    const { difficulties, category } = params;
    const searchTerm = params?.searchTerm || "";

    const {
        data,
        isLoading,

        fetchNextPageData,
        isLoadingElementsCount,
    } = usePagination({
        getDataFn: async (lastDoc) => {
            const q = query(
                collection(db, "recipes"),

                ...(difficulties && difficulties?.length > 0
                    ? [where("difficulty", "in", difficulties)]
                    : []),
                where("category", "==", category),

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
                        defaultSearchTerm: searchTerm,
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
                data={data}
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
            />
        </Container>
    );
};
