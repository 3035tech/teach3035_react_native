import React, { useEffect, useState } from "react";
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
import { Pressable, TouchableOpacity, View } from "react-native";
import { Chip } from "../../components/Chip";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../libs/firebase";

type Props = StackScreenProps<RootStackParamList, "CustomSearch">;

export const CustomSearch = ({ navigation }: Props) => {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
        []
    );

    const [ingredients, setIngredients] = useState<string[]>([]);

    const [search, setSearch] = useState("");

    const getIngredients = async () => {
        try {
            const ref = collection(db, "ingredients");
            const docs = await getDocs(ref);

            const ingredients = docs.docs.map<string>(
                (item) => item.data().name
            );
            setIngredients([...new Set(ingredients)]);
        } catch (error) {
            console.error(error);
        }
    };

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

    const filteredIngredients = ingredients.filter(
        (ingredient) =>
            ingredient.toLowerCase().includes(search.toLowerCase()) &&
            !selectedIngredients.includes(ingredient)
    );

    useEffect(() => {
        getIngredients();
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
        </View>
    );
};
