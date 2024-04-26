import React, { useState } from "react";
import { Header } from "../../components/Header";
import { RootStackParamList } from "../../routes/app.routes";
import { StackScreenProps } from "@react-navigation/stack";
import {
    Container,
    Description,
    IngredientLabel,
    IngredientsContainer,
    StyledSearchInput,
} from "./styles";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { Pressable, TouchableOpacity } from "react-native";
import { Chip } from "../../components/Chip";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";

type Props = StackScreenProps<RootStackParamList, "CustomSearch">;

const INGREDIENTS = ["Arroz", "Feijao", "Maçã", "Frango"];

export const CustomSearch = ({ navigation }: Props) => {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
        []
    );

    const [search, setSearch] = useState("");

    const handleAddIngredient = (ingredient: string) => {
        setSelectedIngredients((prevIngredients) => [
            ...prevIngredients,
            ingredient,
        ]);
    };

    const handleRemoveIngredient = (index: number) => {
        const newIngredients = [...selectedIngredients];
        newIngredients.splice(index, 1);
        setSelectedIngredients(newIngredients);
    };

    const filteredIngredients = INGREDIENTS.filter(
        (ingredient) =>
            ingredient.toLowerCase().includes(search.toLowerCase()) &&
            !selectedIngredients.includes(ingredient)
    );

    console.log(selectedIngredients, "selectedIngredients");
    return (
        <>
            <Header
                title="Busca Personalizada"
                onBack={() => navigation.goBack()}
            />
            <Container>
                <KeyboardAwareFlatList
                    ListHeaderComponent={
                        <>
                            <Description>
                                Encontre receitas com os ingredientes da sua
                                geladeira
                            </Description>

                            <IngredientsContainer>
                                {selectedIngredients.map(
                                    (ingredient, index) => (
                                        <Chip
                                            key={ingredient}
                                            label={ingredient}
                                            rightElement={
                                                <Pressable
                                                    onPress={() =>
                                                        handleRemoveIngredient(
                                                            index
                                                        )
                                                    }
                                                >
                                                    <Ionicons
                                                        name="close"
                                                        size={15}
                                                        color="#fff"
                                                    />
                                                </Pressable>
                                            }
                                        />
                                    )
                                )}
                            </IngredientsContainer>
                            <StyledSearchInput
                                hasFilterIcon={false}
                                placeholder="Digite o ingrediente para buscar"
                                value={search}
                                onChangeText={setSearch}
                                blurOnSubmit
                            />
                        </>
                    }
                    data={filteredIngredients}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleAddIngredient(item)}
                            style={{
                                marginBottom: 12,
                                paddingLeft: 48,
                            }}
                        >
                            <IngredientLabel>{item}</IngredientLabel>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(_, index) => String(index)}
                />

                <Button
                    children="Buscar receita"
                    onPress={() =>
                        navigation.navigate("CustomSearchList", {
                            ingredients: selectedIngredients,
                        })
                    }
                    disabled={selectedIngredients.length === 0}
                />
            </Container>
        </>
    );
};
