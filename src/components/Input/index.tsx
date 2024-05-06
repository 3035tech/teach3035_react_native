import React from "react";
import { TextInputProps, View } from "react-native";
import { InputField, Label, ErrorMessage, InputContainer } from "./styles";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextInputProps & {
    name: string;
    placeholder: string;
    label?: string;
};

export const Input = ({ name, placeholder, label, ...props }: Props) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, onBlur, ...field },
                fieldState: { error },
            }) => (
                <InputContainer>
                    {label ? <Label>{label}</Label> : null}
                    <InputField
                        placeholder={placeholder}
                        onChangeText={onChange}
                        isValid={!error}
                        {...props}
                    />

                    {error?.message ? (
                        <ErrorMessage>{error.message}</ErrorMessage>
                    ) : null}
                </InputContainer>
            )}
        />
    );
};
