import React from "react";
import { Container, Content, Title, StyledButton } from "./styles";
import { Header } from "../../components/Header";
import { StackScreenProps } from "@react-navigation/stack";
import { CreateRecipeStackParamsList } from "../../routes/createRecipe.routes";
import { ScrollView } from "react-native";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputSlider } from "../../components/InputSlider";

const formSchema = z.object({
    calories: z.coerce.number({
        required_error: "Informe a quantidade de calorias",
    }),
    preparationTime: z.coerce.number({
        required_error: "Informe o tempo de preparo",
    }),
});

type FormData = z.infer<typeof formSchema>;
type Props = StackScreenProps<
    CreateRecipeStackParamsList,
    "SetRecipeInformation"
>;
export const SetRecipeInformation = ({
    navigation,
    route: { params },
}: Props) => {
    const methods = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            calories: 10,
            preparationTime: 5,
        },
    });
    const { handleSubmit } = methods;

    const handleNext = ({ calories, preparationTime }: FormData) => {
        navigation.navigate("SetRecipeIngredients", {
            ...params,
            calories,
            preparationTime,
        });
    };
    return (
        <Container>
            <Header
                title="Criar receita"
                onBack={() => {
                    navigation.goBack();
                }}
            />
            <Content>
                <Title>Informações da Receita</Title>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <FormProvider {...methods}>
                        <InputSlider
                            name="calories"
                            label="Calorias em kcal"
                            minimumValue={10}
                            maximumValue={5000}
                            step={10}
                        />
                        <InputSlider
                            label="Tempo de preparo em minutos"
                            name="preparationTime"
                            minimumValue={5}
                            maximumValue={360}
                            step={5}
                        />
                    </FormProvider>
                </ScrollView>
                <StyledButton onPress={handleSubmit(handleNext)}>
                    Próximo
                </StyledButton>
            </Content>
        </Container>
    );
};
