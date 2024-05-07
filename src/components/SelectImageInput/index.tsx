import { useController, useFormContext } from "react-hook-form";
import {
    ErrorMessage,
    RecipeImage,
    SelectImageContainer,
    SelectImageText,
} from "./styles";
import { Pressable, PressableProps } from "react-native";
import * as ImagePicker from "expo-image-picker";

type SelectImageInputProps = PressableProps & {
    name: string;
};

export const SelectImageInput = ({ name, ...props }: SelectImageInputProps) => {
    const { control } = useFormContext();

    const {
        field: { value: image, onChange },
        fieldState: { error },
    } = useController({ name, control, defaultValue: "" });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [1, 1],
            quality: 1,
            allowsEditing: true,
        });

        if (!result.canceled) {
            const image = result.assets[0].uri;
            onChange(image);
        }
    };
    return (
        <Pressable {...props} onPress={pickImage}>
            {image ? (
                <RecipeImage
                    imageStyle={{
                        borderRadius: 10,
                    }}
                    source={image}
                    contentFit="cover"
                    transition={500}
                />
            ) : (
                <SelectImageContainer isInvalid={!!error}>
                    <SelectImageText isInvalid={!!error}>
                        Selecionar Imagem
                    </SelectImageText>
                </SelectImageContainer>
            )}
            {error?.message ? (
                <ErrorMessage>{error.message}</ErrorMessage>
            ) : null}
        </Pressable>
    );
};
