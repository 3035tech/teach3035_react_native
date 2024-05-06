import React from "react";

import { z } from "zod";
import { Header } from "../../components/Header";
import {
    Container,
    Content,
    Description,
    IngredientName,
    IngredientsContainer,
    Title,
} from "./styles";
import { Button } from "../../components/Button";
import { StackScreenProps } from "@react-navigation/stack";
import { CreateRecipeStackParamsList } from "../../routes/createRecipe.routes";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { Input } from "../../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = StackScreenProps<
    CreateRecipeStackParamsList,
    "SetIngredientsDescription"
>;

const formSchema = z.object({
    ingredients: z.array(
        z.object({
            description: z
                .string({
                    required_error: "Informe a descrição do ingrediente",
                })
                .min(8, {
                    message: "A descrição deve conter pelo menos 8 caracteres",
                }),
        })
    ),
});

type FormData = z.infer<typeof formSchema>;

export const SetIngredientsDescription = ({
    navigation,
    route: { params },
}: Props) => {
    const { ingredients } = params;

    const methods = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ingredients: ingredients.map(() => ({ description: "" })),
        },
    });

    const { handleSubmit } = methods;

    const handleNext = ({ ingredients }: FormData) => {
        console.log(ingredients, "INGREDIENTS");
    };
    return (
        <Container>
            <Header onBack={() => navigation.goBack()} title="Criar receita" />

            <Content>
                <Title>Informações da Receita</Title>

                <Description>
                    Informe a descrição dos ingredientes selecionados
                </Description>
                <FormProvider {...methods}>
                    <KeyboardAwareFlatList
                        data={ingredients}
                        keyExtractor={(ingredient) => ingredient}
                        renderItem={({ item, index }) => (
                            <IngredientsContainer>
                                <IngredientName>{item}</IngredientName>
                                <Input
                                    name={`ingredients.${index}.description`}
                                    placeholder={item}
                                />
                            </IngredientsContainer>
                        )}
                    />
                </FormProvider>
                <Button onPress={handleSubmit(handleNext)}>Próximo</Button>
            </Content>
        </Container>
    );
};
