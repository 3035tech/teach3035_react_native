import React from "react";
import { Pressable } from "react-native";
import { Container, Label, Overlay } from "./styles";

type Props = {
    imageUri: string;
    categoryName: string;
    onPress: () => void;
};
export const CategoryCard = ({ categoryName, imageUri, onPress }: Props) => {
    return (
        <Pressable onPress={onPress}>
            <Container source={{ uri: imageUri }}>
                <Overlay />
                <Label>{categoryName}</Label>
            </Container>
        </Pressable>
    );
};
