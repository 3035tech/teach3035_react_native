import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import { z } from "zod";
import { Header } from "../../components/Header";
import * as ImagePicker from "expo-image-picker";

import {
    AccordionContainer,
    Container,
    Description,
    DetailText,
    Dot,
    GeneralInfo,
    ImageBackground,
    IngredientLabel,
    Item,
    MainInfo,
    MaterialIcon,
    Order,
    Overlay,
    Row,
    SelectImageContainer,
    SelectImageText,
    StyledButton,
    StyledSelectImageInput,
    Title,
} from "./styles";
import { CreateRecipeStackParamsList } from "../../routes/createRecipe.routes";
import { FlatList, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Accordion } from "../../components/Accordion";
import { RECIPE_DIFFICULTY_MAP } from "../../constants/recipeDifficulty";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    images: z.array(
        z.object({
            uri: z.string({ required_error: "Adicione a imagem" }),
        })
    ),
});

type FormData = z.infer<typeof formSchema>;

type Props = StackScreenProps<CreateRecipeStackParamsList, "SetRecipeImages">;
export const SetRecipeImages = ({ navigation, route: { params } }: Props) => {
    const {
        name,
        calories,
        description,
        difficulty,
        ingredientsDescription,
        ingredients,
        preparationSteps,
        preparationTime,
        category,
    } = params;

    const methods = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            images: [
                {
                    uri: "",
                },
            ],
        },
    });

    const { control, handleSubmit, watch } = methods;

    const { fields, append } = useFieldArray({ name: "images", control });

    const images = watch("images");

    const firstImageUri = images?.[0].uri;

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [1, 1],
            quality: 1,
            allowsEditing: true,
        });

        if (!result.canceled) {
            const image = result.assets[0].uri;
            append({ uri: image });
        }
    };

    const handleCreateRecipe = ({ images }: FormData) => {
        console.log(params, images, "DADOS");
    };
    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                    imageStyle={{
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    }}
                    source={{
                        uri: "https://img.freepik.com/fotos-gratis/vista-superior-da-torta-de-maca-de-acao-de-gracas-com-talheres-e-folhas_23-2148638999.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709769600&semt=ais",
                    }}
                    blurRadius={10}
                    contentFit="cover"
                    transition={500}
                >
                    <Overlay />

                    <Header
                        mode="light"
                        onBack={() => navigation.goBack()}
                        title="Criar Receita"
                    />
                    <FormProvider {...methods}>
                        <FlatList
                            data={images}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ padding: 30 }}
                            ListFooterComponent={
                                firstImageUri ? (
                                    <Pressable onPress={pickImage}>
                                        <SelectImageContainer>
                                            <SelectImageText>
                                                Selecionar Imagem
                                            </SelectImageText>
                                        </SelectImageContainer>
                                    </Pressable>
                                ) : null
                            }
                            keyExtractor={(_, index) => fields[index].id}
                            renderItem={({ index }) => (
                                <StyledSelectImageInput
                                    name={`images.${index}.uri`}
                                />
                            )}
                        />
                    </FormProvider>

                    <MainInfo>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Title>{name}</Title>
                        </View>
                        <Description>{description}</Description>
                    </MainInfo>

                    <GeneralInfo>
                        <Row>
                            <Icon name="time" size={12} color="#303030" />
                            <DetailText>{preparationTime} min</DetailText>
                        </Row>
                        <Row>
                            <MaterialIcon
                                name="pot-steam"
                                size={16}
                                color="#303030"
                            />
                            <DetailText>
                                {RECIPE_DIFFICULTY_MAP[difficulty]}
                            </DetailText>
                        </Row>

                        <Row>
                            <Icon
                                name="flame-sharp"
                                size={12}
                                color="#303030"
                            />

                            <DetailText>{calories}Kcal</DetailText>
                        </Row>
                    </GeneralInfo>
                </ImageBackground>

                <AccordionContainer>
                    <Accordion title="Ingredientes">
                        {ingredientsDescription.map((ingredient, index) => {
                            return (
                                <Item key={index}>
                                    <IngredientLabel>
                                        {ingredient}
                                    </IngredientLabel>
                                </Item>
                            );
                        })}
                    </Accordion>

                    <Accordion title="Modo de Preparo">
                        {preparationSteps.map((step, index) => {
                            return (
                                <Item key={index}>
                                    <Dot>
                                        <Order>{index + 1}</Order>
                                    </Dot>
                                    <IngredientLabel>{step}</IngredientLabel>
                                </Item>
                            );
                        })}
                    </Accordion>
                </AccordionContainer>
            </ScrollView>
            <StyledButton onPress={handleSubmit(handleCreateRecipe)}>
                Criar receita
            </StyledButton>
        </Container>
    );
};
