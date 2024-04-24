import React from "react";
import { Container, Label } from "./styles";

type Props = {
    label: string;
    rightElement?: React.ReactNode;
    variant?: "solid" | "outline";
};
export const Chip = ({ label, rightElement, variant = "solid" }: Props) => {
    return (
        <Container variant={variant}>
            <Label variant={variant}>{label}</Label>

            {rightElement}
        </Container>
    );
};
