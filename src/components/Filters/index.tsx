import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Button } from "../../components/Button";

import {
    AccordionContent,
    AccordionHeader,
    AccordionTitle,
    ButtonContainer,
    Clear,
    Container,
    DifficultyButton,
    DifficultyText,
    Header,
    Title,
} from "./styles";

import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import {
    RecipeDifficulty,
    RECIPE_DIFFICULTY_MAP,
} from "../../constants/recipeDifficulty";

type DifficultyOption = RecipeDifficulty;

const DIFFICULTIES = Object.keys(RECIPE_DIFFICULTY_MAP) as DifficultyOption[];

type Props = {
    handleClose: () => void;
    onSubmit?: (data: { difficulties: DifficultyOption[] }) => void;
};

export const Filters = ({ handleClose, onSubmit }: Props) => {
    const [selectedDifficulties, setSelectedDifficulties] = useState(
        [] as DifficultyOption[]
    );
    const handleToggleDifficulty = (
        difficulty: DifficultyOption,
        isActive: boolean
    ) => {
        if (isActive) {
            setSelectedDifficulties((state) =>
                state.filter((item) => item !== difficulty)
            );
        } else {
            setSelectedDifficulties((state) => [...state, difficulty]);
        }
    };

    const theme = useTheme();

    return (
        <Container>
            <ScrollView
                overScrollMode="never"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: Number(theme.spaces.xxxl.replace("px", "")),
                }}
            >
                <Header>
                    <Title>Filtros</Title>
                    <Icon
                        name="close"
                        size={25}
                        color="#F98549"
                        onPress={handleClose}
                    />
                </Header>
                <AccordionHeader>
                    <AccordionTitle>Dificuldade</AccordionTitle>
                </AccordionHeader>
                <AccordionContent>
                    {DIFFICULTIES.map((difficulty, index) => {
                        const isActive =
                            selectedDifficulties.includes(difficulty);
                        return (
                            <DifficultyButton
                                isActive={isActive}
                                key={index}
                                onPress={() =>
                                    handleToggleDifficulty(difficulty, isActive)
                                }
                            >
                                <DifficultyText isActive={isActive}>
                                    {RECIPE_DIFFICULTY_MAP[difficulty]}
                                </DifficultyText>
                            </DifficultyButton>
                        );
                    })}
                </AccordionContent>
            </ScrollView>
            <ButtonContainer>
                <Button onPress={() => {}}>Aplicar filtros</Button>
                <TouchableOpacity
                    onPress={() => {
                        setSelectedDifficulties([]);
                    }}
                >
                    <Clear>Limpar</Clear>
                </TouchableOpacity>
            </ButtonContainer>
        </Container>
    );
};
