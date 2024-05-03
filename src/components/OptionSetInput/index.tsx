import { Controller, useFormContext } from "react-hook-form";
import {
    Container,
    Content,
    ContentText,
    ContentWrapper,
    ErrorMessage,
    Label,
} from "./styles";
import { Pressable } from "react-native";

type OptionSetInput = {
    name: string;
    label?: string;
    options: {
        label: string;
        value: string;
    }[];
};

export const OptionSetInput = ({
    name,
    options,
    label,
    ...props
}: OptionSetInput) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, ...field },
                fieldState: { error },
            }) => (
                <Container {...props}>
                    {label ? <Label>{label}</Label> : null}
                    <ContentWrapper>
                        {options.map((option, index) => {
                            const isSelected = option.value === field.value;
                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => {
                                        if (!isSelected) {
                                            onChange(option.value);
                                        }
                                    }}
                                >
                                    <Content
                                        isActive={isSelected}
                                        isInvalid={!!error}
                                    >
                                        <ContentText isActive={isSelected}>
                                            {option.label}
                                        </ContentText>
                                    </Content>
                                </Pressable>
                            );
                        })}
                    </ContentWrapper>

                    {error?.message ? (
                        <ErrorMessage>{error.message}</ErrorMessage>
                    ) : null}
                </Container>
            )}
        />
    );
};
