import React from "react";

import { z } from "zod";
import { Header } from "../../components/Header";
import {
    AddFieldText,
    CloseIcon,
    Container,
    Content,
    Description,
    Dot,
    Item,
    Order,
    StyledInput,
    Title,
} from "./styles";
import { Button } from "../../components/Button";
import { StackScreenProps } from "@react-navigation/stack";
import { CreateRecipeStackParamsList } from "../../routes/createRecipe.routes";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { zodResolver } from "@hookform/resolvers/zod";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../components/Input";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = StackScreenProps<
    CreateRecipeStackParamsList,
    "SetPreparationSteps"
>;

const formSchema = z.object({
    steps: z.array(
        z.object({
            description: z
                .string()
                .min(10, { message: "Informe a descrição desse passo" }),
        })
    ),
});

type FormData = z.infer<typeof formSchema>;

export const SetPreparationSteps = ({
    navigation,
    route: { params },
}: Props) => {
    const methods = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            steps: [
                {
                    description: "",
                },
            ],
        },
    });

    const { handleSubmit, control } = methods;

    const { fields, append, remove } = useFieldArray({
        name: "steps",
        control,
    });

    const handleNext = ({ steps }: FormData) => {
        console.log(steps);
    };
    return (
        <Container>
            <Header onBack={() => navigation.goBack()} title="Criar receita" />

            <Content>
                <Title>Passo a Passo da Receita</Title>

                <Description>Informe o passo a passo da receita</Description>
                <FormProvider {...methods}>
                    <KeyboardAwareFlatList
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        data={fields}
                        keyExtractor={(item) => String(item.id)}
                        ListFooterComponent={
                            <TouchableOpacity
                                onPress={() => append({ description: "" })}
                            >
                                <AddFieldText>Adicionar passo</AddFieldText>
                            </TouchableOpacity>
                        }
                        renderItem={({ index }) => {
                            return (
                                <Item>
                                    <Dot>
                                        <Order>{index + 1}</Order>
                                    </Dot>
                                    <StyledInput
                                        autoFocus
                                        name={`steps.${index}.description`}
                                        placeholder="Descrição do passo"
                                        multiline
                                    />
                                    {index > 0 ? (
                                        <CloseIcon
                                            name="close"
                                            size={25}
                                            color="#F98549"
                                            onPress={() => remove(index)}
                                        />
                                    ) : (
                                        <View style={{ width: 25 }} />
                                    )}
                                </Item>
                            );
                        }}
                    />
                </FormProvider>
                <Button onPress={handleSubmit(handleNext)}>Próximo</Button>
            </Content>
        </Container>
    );
};
