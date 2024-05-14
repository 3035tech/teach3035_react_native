import React, { useEffect, useState } from "react";

import { StackScreenProps } from "@react-navigation/stack";

import { Header } from "../../components/Header";
import { RootStackParamList } from "../../routes/app.routes";
import { RECIPES } from "../../mocks/recipes";
import {
    Container,
    Description,
    DetailText,
    FavoriteIcon,
    GeneralInfo,
    ImageBackground,
    Item,
    IngredientLabel,
    MainInfo,
    MaterialIcon,
    Overlay,
    RecipeImage,
    Row,
    Title,
    Selection,
    AccordionContainer,
    Dot,
    Order,
} from "./styles";
import {
    FlatList,
    ScrollView,
    Touchable,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RECIPE_DIFFICULTY_MAP } from "../../constants/recipeDifficulty";
import { Recipe } from "../../models/Recipe";
import { Accordion } from "../../components/Accordion";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../libs/firebase";
import { FirebaseRecipe } from "../../libs/firebase/models/recipes";
import { useUser } from "../../hooks/useUser";

type RecipeInfo = Omit<Recipe, "imageUri"> & {
    images: string[];
    preparationSteps: string[];
    ingredientsDescription: string[];
};

type FirebaseRecipeInfo = FirebaseRecipe & {
    ingredientsDescription: string[];
    preparationSteps: string[];
};
export const RecipeInfo = ({
    navigation,
    route: { params },
}: StackScreenProps<RootStackParamList, "RecipeInfo">) => {
    const [user] = useUser();

    const [recipe, setRecipe] = useState<RecipeInfo>();
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
        []
    );
    const { recipeId, recipeName } = params;

    const getRecipeInfo = async () => {
        try {
            const recipeQuery = doc(db, "recipes", recipeId);

            const docs = await getDoc(recipeQuery);

            const data = docs.data() as FirebaseRecipeInfo;

            setRecipe({
                id: docs.id,
                name: data.name,
                calories: data.calories,
                category: data.category,
                description: data.description,
                difficulty: data.difficulty,
                images: data.images,
                preparationTime: data.preparationTime,
                isFavorited: data.favoritedBy?.[user?.uid!],
                preparationSteps: data.preparationSteps,
                ingredientsDescription: data.ingredientsDescription,
            });
        } catch (error) {}
    };

    const handlePressFavorite = async () => {
        const isFavorited = recipe?.isFavorited;
        try {
            getRecipeInfo();

            if (isFavorited) {
                await updateDoc(doc(db, `recipes`, recipeId), {
                    [`favoritedBy.${user?.uid}`]: deleteField(),
                });
            } else {
                await updateDoc(doc(db, `recipes`, recipeId), {
                    [`favoritedBy.${user?.uid}`]: true,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const toggleSelectedIngredient = (
        ingredient: string,
        isSelected: boolean
    ) => {
        if (isSelected) {
            setSelectedIngredients((state) =>
                state.filter((item) => item !== ingredient)
            );
        } else {
            setSelectedIngredients((state) => [...state, ingredient]);
        }
    };

    useEffect(() => {
        getRecipeInfo();
    }, []);
    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                    imageStyle={{
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    }}
                    source={recipe?.images[0]}
                    blurRadius={10}
                    contentFit="cover"
                    transition={500}
                >
                    <Overlay />
                    <Header
                        mode="light"
                        onBack={() => navigation.goBack()}
                        title={recipeName}
                    />
                    <FlatList
                        data={recipe?.images || []}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ padding: 30 }}
                        keyExtractor={(_, index) => String(index)}
                        renderItem={({ item }) => (
                            <RecipeImage
                                source={item}
                                contentFit="cover"
                                transition={500}
                            />
                        )}
                    />

                    <MainInfo>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Title>{recipeName}</Title>
                            <TouchableOpacity onPress={handlePressFavorite}>
                                <FavoriteIcon
                                    isFavorited={recipe?.isFavorited}
                                    name={
                                        !recipe?.isFavorited
                                            ? "heart-outline"
                                            : "heart"
                                    }
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                        <Description>{recipe?.description}</Description>
                    </MainInfo>

                    <GeneralInfo>
                        <Row>
                            <Icon name="time" size={12} color="#303030" />
                            <DetailText>
                                {recipe?.preparationTime} min
                            </DetailText>
                        </Row>
                        <Row>
                            <MaterialIcon
                                name="pot-steam"
                                size={16}
                                color="#303030"
                            />
                            <DetailText>
                                {RECIPE_DIFFICULTY_MAP[recipe?.difficulty]}
                            </DetailText>
                        </Row>

                        <Row>
                            <Icon
                                name="flame-sharp"
                                size={12}
                                color="#303030"
                            />

                            <DetailText>{recipe?.calories}Kcal</DetailText>
                        </Row>
                    </GeneralInfo>
                </ImageBackground>

                <AccordionContainer>
                    <Accordion title="Ingredientes">
                        {recipe?.ingredientsDescription.map(
                            (ingredient, index) => {
                                const isSelected =
                                    selectedIngredients.includes(ingredient);
                                return (
                                    <Item
                                        key={index}
                                        onPress={() => {
                                            toggleSelectedIngredient(
                                                ingredient,
                                                isSelected
                                            );
                                        }}
                                    >
                                        <Selection
                                            isSelected={selectedIngredients.includes(
                                                ingredient
                                            )}
                                        />
                                        <IngredientLabel>
                                            {ingredient}
                                        </IngredientLabel>
                                    </Item>
                                );
                            }
                        )}
                    </Accordion>

                    <Accordion title="Modo de Preparo">
                        {recipe?.preparationSteps.map((ingredient, index) => {
                            return (
                                <Item key={index}>
                                    <Dot>
                                        <Order>{index + 1}</Order>
                                    </Dot>
                                    <IngredientLabel>
                                        {ingredient}
                                    </IngredientLabel>
                                </Item>
                            );
                        })}
                    </Accordion>
                </AccordionContainer>
            </ScrollView>
        </Container>
    );
};
