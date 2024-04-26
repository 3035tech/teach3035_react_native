import React from "react";

import Icon from "react-native-vector-icons/Ionicons";
import { Pressable, TextInputProps } from "react-native";
import { InputContainer, InputField } from "./styles";

type Props = {
    onClickFilter?: () => void;
    onPress?: () => void;
    hasFilterIcon?: boolean;
} & TextInputProps;

export const SearchInput = ({
    hasFilterIcon = true,
    onClickFilter,
    onPress,
    style,
    ...props
}: Props) => {
    return (
        <Pressable onPress={onPress} style={style}>
            <InputContainer>
                <Icon name="search" color="#B5B5B5" size={20} />

                <InputField {...props} />
                {hasFilterIcon && (
                    <Icon
                        onPress={onClickFilter}
                        name="filter"
                        color="#F98549"
                        size={20}
                    />
                )}
            </InputContainer>
        </Pressable>
    );
};
