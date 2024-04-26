import { StackScreenProps } from "@react-navigation/stack";
import { Header } from "../../components/Header";
import { Container, NoResultsFound, Row, Title } from "./styles";
import { RootStackParamList } from "../../routes/app.routes";
import { CATEGORIES } from "../../mocks/categories";
import { FlatList, Dimensions } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { RECIPES } from "../../mocks/recipes";
import { RecipeCard } from "../../components/RecipeCard";

type Props = StackScreenProps<RootStackParamList, "Categories">;

export const Categories = ({ navigation }: Props) => {
    return (
        <Container>
            <Header onBack={() => navigation.goBack()} title="Categorias" />
            <FlatList
                data={CATEGORIES}
                keyExtractor={(category) => String(category.id)}
                contentContainerStyle={{
                    paddingTop: 24,
                }}
                renderItem={({ item: category }) => (
                    <>
                        <Row>
                            <Title>{category.name}</Title>
                            <Icon
                                name="chevron-forward"
                                color="#303030"
                                size={18}
                            />
                        </Row>
                        <RecipesByCategory category={category.name} />
                    </>
                )}
            />
        </Container>
    );
};

type RecipesByCategoryProps = {
    category: string;
};

const RecipesByCategory = ({ category }: RecipesByCategoryProps) => {
    const filteredRecipesByCategory = RECIPES.filter(
        (recipe) => recipe.category === category
    );
    const { width } = Dimensions.get("window");

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filteredRecipesByCategory}
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
                    isFavorited={item.isFavorited}
                    heightVariant="small"
                    onPress={() => {}}
                />
            )}
            ListEmptyComponent={
                <NoResultsFound>
                    Não há nenhuma receita nesta categoria
                </NoResultsFound>
            }
        />
    );
};
