import Slider, { SliderProps } from "@react-native-community/slider";
import React from "react";

import { useController, useFormContext } from "react-hook-form";
import { useAnimatedProps, useSharedValue } from "react-native-reanimated";
import { Container, Input, Label, LabelsContainer, Value } from "./styles";

type Props = Omit<SliderProps, "value"> & {
    name: string;
    label: string;
};

export const InputSlider = ({
    label,
    name,
    style,
    minimumValue,
    maximumValue,
    ...props
}: Props) => {
    const { control } = useFormContext();

    const {
        field: { value, onChange },
    } = useController({ name, control });
    const currentValue = useSharedValue(value);

    const animatedTextInputProps = useAnimatedProps(() => {
        return {
            text: String(currentValue.value),
        };
    });
    return (
        <Container style={style}>
            <Label>{label}</Label>
            <>
                <Slider
                    style={{
                        flex: 1,
                    }}
                    thumbTintColor="#F98549"
                    minimumTrackTintColor="#F98549"
                    minimumValue={minimumValue}
                    maximumValue={maximumValue}
                    {...props}
                    onValueChange={(value) => {
                        currentValue.value = value;
                        onChange(value);
                    }}
                />
                <LabelsContainer>
                    <Value>{minimumValue}</Value>
                    <Input
                        defaultValue={String(value || 0)}
                        editable={false}
                        //@ts-ignore
                        animatedProps={animatedTextInputProps}
                    />
                    <Value>{maximumValue}</Value>
                </LabelsContainer>
            </>
        </Container>
    );
};
