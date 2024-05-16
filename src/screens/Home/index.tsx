import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import {
    Container,
    Header,
    Name,
    NoResultsFound,
    Row,
    SearchContainer,
    StyledCustomSearchButton,
    Title,
    Welcome,
} from "./styles";

import { ScrollView, Image, View, FlatList, Dimensions } from "react-native";

import avatar from "../../assets/avatar.png";
import React, { useEffect, useState } from "react";
import { SearchInput } from "../../components/SearchInput";
import { CategoryCard } from "../../components/CategoryCard";
import { RecipeCard } from "../../components/RecipeCard";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";
import { useUser } from "../../hooks/useUser";
import {
    collection,
    deleteField,
    doc,
    getDocs,
    limit,
    onSnapshot,
    query,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../libs/firebase";
import { FirebaseRecipeCategory } from "../../libs/firebase/models/recipeCategory";
import { Recipe } from "../../models/Recipe";
import { FirebaseRecipe } from "../../libs/firebase/models/recipes";

type Props = StackScreenProps<RootStackParamList>;

export const Home = ({ navigation: { navigate } }: Props) => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<
        FirebaseRecipeCategory[] | null
    >(null);

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const [user] = useUser();
    const insets = useSafeAreaInsets();
    const { width } = Dimensions.get("window");

    const getCategories = async () => {
        try {
            const categoriesDocs = await getDocs(
                collection(db, "recipe_categories")
            );

            const categories = categoriesDocs.docs.map((item) => {
                const data = item.data();

                return {
                    ...data,
                    id: item.id,
                } as FirebaseRecipeCategory;
            });

            setCategories(categories);
        } catch (error) {}
    };
    const getRecipes = async () => {
        return onSnapshot(query(collection(db, "recipes")), {
            next: async (snapshot) => {
                setLoading(true);
                const allRecipes = snapshot.docs.map<Recipe>((doc) => {
                    const data = doc.data() as FirebaseRecipe;
                    return {
                        ...data,
                        imageUri: data.mainImageUri,
                        id: doc.id,
                        isFavorited: data.favoritedBy[user!?.uid],
                    };
                });
                setRecipes(allRecipes);
            },
            complete: () => setLoading(true),
        });
    };

    const handlePressFavorite = async (
        recipeId: string,
        isFavorited: boolean
    ) => {
        try {
            if (isFavorited) {
                await updateDoc(doc(db, "recipes", recipeId), {
                    [`favoritedBy.${user?.uid}`]: deleteField(),
                });
            } else {
                await updateDoc(doc(db, "recipes", recipeId), {
                    [`favoritedBy.${user?.uid}`]: true,
                });
            }
        } catch (error) {}
    };

    useEffect(() => {
        getCategories();
        getRecipes();
    }, []);

    return (
        <Container topInset={insets.top}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header>
                    <Image source={avatar} />
                    <View>
                        <Name>Olá, {user?.displayName}</Name>
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
                    data={categories}
                    contentContainerStyle={{
                        paddingTop: 16,
                        paddingLeft: 20,
                        gap: 12,
                    }}
                    renderItem={({ item }) => (
                        <CategoryCard
                            categoryName={item.name}
                            imageUri={item.imageUri}
                            onPress={() =>
                                navigate("RecipeList", {
                                    category: item.name,
                                })
                            }
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
                    data={recipes}
                    contentContainerStyle={{
                        paddingTop: 16,
                        paddingLeft: 20,
                        gap: 12,
                    }}
                    ListEmptyComponent={
                        !loading ? (
                            <NoResultsFound>
                                Nenhuma receita encontrada
                            </NoResultsFound>
                        ) : null
                    }
                    renderItem={({ item }) => (
                        <RecipeCard
                            style={{ width: width * 0.45 }}
                            id={String(item.id)}
                            name={item.name}
                            calories={item.calories}
                            imageUri={item.imageUri}
                            difficulty={item.difficulty}
                            isFavorited={!!item.isFavorited}
                            preparationTime={item.preparationTime}
                            onFavoritePress={() =>
                                handlePressFavorite(item.id, !!item.isFavorited)
                            }
                            onPress={() =>
                                navigate("RecipeInfo", {
                                    recipeId: item.id,
                                    recipeName: item.name,
                                })
                            }
                            heightVariant="small"
                        />
                    )}
                />
            </ScrollView>
        </Container>
    );
};
