import React, { useState } from "react";

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
export const RecipeInfo = ({
    navigation,
    route: { params },
}: StackScreenProps<RootStackParamList, "RecipeInfo">) => {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
        []
    );
    const { recipeId, recipeName } = params;

    const filteredRecipe = RECIPES.find(
        (recipe) => recipe.id === recipeId
    ) as Recipe;

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
    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                    imageStyle={{
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    }}
                    source={filteredRecipe?.images[0]}
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
                        data={filteredRecipe?.images || []}
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
                            <TouchableOpacity onPress={() => {}}>
                                <FavoriteIcon
                                    isFavorited={filteredRecipe?.isFavorited}
                                    name={
                                        !filteredRecipe?.isFavorited
                                            ? "heart-outline"
                                            : "heart"
                                    }
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                        <Description>{filteredRecipe?.description}</Description>
                    </MainInfo>

                    <GeneralInfo>
                        <Row>
                            <Icon name="time" size={12} color="#303030" />
                            <DetailText>
                                {filteredRecipe?.preparationTime} min
                            </DetailText>
                        </Row>
                        <Row>
                            <MaterialIcon
                                name="pot-steam"
                                size={16}
                                color="#303030"
                            />
                            <DetailText>
                                {
                                    RECIPE_DIFFICULTY_MAP[
                                        filteredRecipe?.difficulty
                                    ]
                                }
                            </DetailText>
                        </Row>

                        <Row>
                            <Icon
                                name="flame-sharp"
                                size={12}
                                color="#303030"
                            />

                            <DetailText>
                                {filteredRecipe?.calories}Kcal
                            </DetailText>
                        </Row>
                    </GeneralInfo>
                </ImageBackground>

                <AccordionContainer>
                    <Accordion title="Ingredientes">
                        {filteredRecipe?.ingredients.map(
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
                        {filteredRecipe?.preparationSteps.map(
                            (ingredient, index) => {
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
                            }
                        )}
                    </Accordion>
                </AccordionContainer>
            </ScrollView>
        </Container>
    );
};
