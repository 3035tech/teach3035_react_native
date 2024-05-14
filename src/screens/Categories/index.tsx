import { StackScreenProps } from "@react-navigation/stack";
import { Header } from "../../components/Header";
import { Container, NoResultsFound, Row, Title } from "./styles";
import { RootStackParamList } from "../../routes/app.routes";
import { FlatList, Dimensions, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { RecipeCard } from "../../components/RecipeCard";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../libs/firebase";
import { Recipe } from "../../models/Recipe";
import { FirebaseRecipe } from "../../libs/firebase/models/recipes";
import { useUser } from "../../hooks/useUser";

type Props = StackScreenProps<RootStackParamList, "Categories">;

export const Categories = ({ navigation }: Props) => {
    const [categories, setCategories] = useState<string[]>([]);

    const getCategories = async () => {
        try {
            const categoriesDocs = await getDocs(
                collection(db, "recipe_categories")
            );

            const categories = categoriesDocs.docs.map((item) => {
                const data = item.data();

                return data.name;
            });

            setCategories(categories);
        } catch (error) {}
    };

    useEffect(() => {
        getCategories();
    }, []);
    return (
        <Container>
            <Header onBack={() => navigation.goBack()} title="Categorias" />
            <FlatList
                data={categories}
                keyExtractor={(category) => String(category)}
                contentContainerStyle={{
                    paddingTop: 24,
                }}
                renderItem={({ item: category }) => (
                    <>
                        <Row
                            onPress={() =>
                                navigation.navigate("RecipeList", {
                                    category,
                                })
                            }
                        >
                            <Title>{category}</Title>
                            <Icon
                                name="chevron-forward"
                                color="#303030"
                                size={18}
                            />
                        </Row>
                        <RecipesByCategory
                            category={category}
                            onPressRecipe={(recipe) =>
                                navigation.navigate("RecipeInfo", {
                                    recipeId: recipe.id,
                                    recipeName: recipe.name,
                                })
                            }
                        />
                    </>
                )}
            />
        </Container>
    );
};

type RecipesByCategoryProps = {
    category: string;
    onPressRecipe: (recipe: Recipe) => void;
};

const RecipesByCategory = ({
    category,
    onPressRecipe,
}: RecipesByCategoryProps) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user] = useUser();

    const { width } = Dimensions.get("window");

    const getRecipes = async () => {
        try {
            setIsLoading(true);
            const recipesQuery = query(
                collection(db, "recipes"),
                where("category", "==", category),
                limit(5)
            );

            const docs = await getDocs(recipesQuery);

            const recipes = docs.docs.map<Recipe>((recipe) => {
                const data = recipe.data() as FirebaseRecipe;

                return {
                    ...data,
                    imageUri: data.mainImageUri,
                    id: recipe.id,
                    isFavorited: data.favoritedBy[user!?.uid],
                };
            });

            setRecipes(recipes);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getRecipes();
    }, []);

    return !isLoading ? (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recipes}
            contentContainerStyle={{ gap: 12, padding: 12 }}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
                <RecipeCard
                    style={{ width: width * 0.45 }}
                    id={String(item.id)}
                    name={item.name}
                    imageUri={item.imageUri}
                    calories={item.calories}
                    difficulty={item.difficulty}
                    preparationTime={item.preparationTime}
                    isFavorited={!!item.isFavorited}
                    heightVariant="small"
                    onPress={() => onPressRecipe(item)}
                />
            )}
            ListEmptyComponent={
                <NoResultsFound>
                    Não há nenhuma receita nesta categoria
                </NoResultsFound>
            }
        />
    ) : (
        <ActivityIndicator
            color="#F98549"
            size="large"
            style={{ alignSelf: "center", marginVertical: 24 }}
        />
    );
};
