import React, { useState, useEffect } from "react";
import { Container, Content, Title, StyledButton } from "./styles";
import { Header } from "../../components/Header";
import { StackScreenProps } from "@react-navigation/stack";
import { CreateRecipeStackParamsList } from "../../routes/createRecipe.routes";
import { ScrollView } from "react-native";
import { Input } from "../../components/Input";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OptionSetInput } from "../../components/OptionSetInput";
import { RECIPE_DIFFICULTY_MAP } from "../../constants/recipeDifficulty";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../libs/firebase";
import { FirebaseRecipeCategory } from "../../libs/firebase/models/recipeCategory";

const formSchema = z.object({
    name: z.string({ required_error: "Preencha o nome da receita" }).min(4, {
        message: "O nome da receita deve ter pelo menos 4 caractereres",
    }),
    description: z
        .string({ required_error: "Preencha a descrição da receita" })
        .min(10, {
            message:
                "A descrição da receita deve ter pelo menos 10 caractereres",
        }),

    difficulty: z.enum(["EASY", "MEDIUM", "HARD"], {
        required_error: "A receita deve ter uma dificuldade",
    }),
    category: z.string({ required_error: "Preencha a categoria da receita" }),
});

const difficulties = Object.entries(RECIPE_DIFFICULTY_MAP).map(
    ([value, label]) => ({
        label,
        value,
    })
);

const CATEGORIES = [
    { label: "Almoço", value: "lunch" },
    { label: "Jantar", value: "dinner" },
    { label: "Lanche", value: "snack" },
];

type FormData = z.infer<typeof formSchema>;
type Props = StackScreenProps<CreateRecipeStackParamsList, "NewRecipeCreation">;
export const NewRecipeCreation = ({ navigation }: Props) => {
    const [categories, setCategories] = useState<
        {
            label: string;
            value: string;
        }[]
    >([]);
    const methods = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });
    const { handleSubmit } = methods;

    const getCategories = async () => {
        try {
            const categoriesDocs = await getDocs(
                collection(db, "recipe_categories")
            );

            const categories = categoriesDocs.docs.map((item) => {
                const data = item.data();

                return {
                    label: data.name as string,
                    value: data.name as string,
                };
            });

            setCategories(categories);
        } catch (error) {}
    };

    const handleNext = ({
        name,
        description,
        difficulty,
        category,
    }: FormData) => {
        navigation.navigate("SetRecipeInformation", {
            name,
            description,
            difficulty,
            category,
        });
    };

    useEffect(() => {
        getCategories();
    }, []);
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
                        <Input
                            label="Nome da receita"
                            placeholder="Nome da receita"
                            name="name"
                        />
                        <Input
                            multiline
                            label="Descrição"
                            placeholder="Descrição da receita"
                            name="description"
                        />
                        <OptionSetInput
                            name="difficulty"
                            label="Dificuldade"
                            options={difficulties}
                        />
                        <OptionSetInput
                            name="category"
                            label="Categoria"
                            options={categories}
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
