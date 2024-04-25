import React from "react";

import { Pressable, PressableProps, View } from "react-native";
import {
    Container,
    Content,
    Details,
    FavoriteIcon,
    Item,
    Label,
    Overlay,
    Title,
} from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { RECIPE_DIFFICULTY_MAP } from "../../constants/recipeDifficulty";

type Props = PressableProps & {
    id: string;
    name: string;
    preparationTime: number;
    difficulty: string;
    calories: number;
    imageUri: string;
    isFavorited: boolean;
    heightVariant?: "large" | "small";
    onPress?: () => void;
    onFavoritePress?: () => void;
};

export const RecipeCard = ({
    id,
    name,
    preparationTime,
    difficulty,
    calories,
    imageUri,
    isFavorited,
    heightVariant = "large",
    onPress,
    onFavoritePress,
    ...props
}: Props) => {
    return (
        <Pressable onPress={onPress} {...props}>
            <Container source={{ uri: imageUri }} heightVariant={heightVariant}>
                <Overlay />

                <Content>
                    <FavoriteIcon
                        isFavorited={isFavorited}
                        name={isFavorited ? "heart" : "heart-outline"}
                        size={30}
                    />

                    <View>
                        <Title>{name}</Title>
                        <Details>
                            <Item>
                                <Icon
                                    name="time-outline"
                                    size={12}
                                    color="#fff"
                                />
                                <Label>{preparationTime} min</Label>
                            </Item>

                            <Item>
                                <MaterialIcon
                                    name="pot-steam"
                                    size={12}
                                    color="#fff"
                                />

                                <Label>
                                    {RECIPE_DIFFICULTY_MAP[difficulty]}
                                </Label>
                            </Item>

                            <Item>
                                <Icon name="flame" size={12} color="#fff" />
                                <Label>{calories} kcal</Label>
                            </Item>
                        </Details>
                    </View>
                </Content>
            </Container>
        </Pressable>
    );
};
