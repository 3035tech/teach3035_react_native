import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { z } from "zod";
import { Header } from "../../components/Header";
import { CreateRecipeStackParamsList } from "../../routes/createRecipe.routes";
import {
    Container,
    Content,
    Description,
    IngredientContainer,
    IngredientContent,
    Title,
} from "./styles";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Chip } from "../../components/Chip";

type Props = BottomTabScreenProps<
    CreateRecipeStackParamsList,
    "SetRecipeIngredients"
>;

const formSchema = z.object({
    ingredients: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export const SetRecipeIngredients = ({
    navigation,
    route: { params },
}: Props) => {
    const methods = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ingredients: "",
        },
    });

    const { handleSubmit, watch } = methods;

    const ingredients = watch("ingredients");

    const ingredientsList = ingredients.split(",");

    const handleNext = () => {
        const formattedIngredients = ingredientsList
            .map((ingredient) => ingredient.trim())
            .filter((trimmedIngredient) => trimmedIngredient !== "")
            .map(
                (filteredIngredient) =>
                    filteredIngredient.charAt(0).toUpperCase() +
                    filteredIngredient.slice(1)
            );

        navigation.navigate("SetIngredientsDescription", {
            ...params,
            ingredients: formattedIngredients,
        });
    };
    return (
        <Container>
            <Header onBack={() => navigation.goBack()} title="Criar receita" />

            <Content>
                <Title>Ingredientes</Title>

                <Description>
                    Informe os ingredientes da sua receita separando-os por
                    virgula
                </Description>
                <IngredientContainer>
                    <IngredientContent>
                        {ingredientsList.map((ingredient) => {
                            const trimmedIngredient = ingredient.trim();
                            return trimmedIngredient ? (
                                <Chip
                                    key={ingredient}
                                    label={trimmedIngredient}
                                    variant="solid"
                                />
                            ) : null;
                        })}
                    </IngredientContent>
                </IngredientContainer>
                <FormProvider {...methods}>
                    <Input
                        name="ingredients"
                        placeholder="Alho, Cebola, etc"
                        label="Ingredientes"
                    />
                </FormProvider>
                <Button onPress={handleSubmit(handleNext)}>Próximo</Button>
            </Content>
        </Container>
    );
};
