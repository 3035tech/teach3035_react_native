import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { AccordionContent, AccordionHeader, AccordionTitle } from "./styles";

type Props = {
    title: string;
    children: React.ReactNode;
};

export const Accordion = ({ title, children }: Props) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <AccordionHeader onPress={toggleAccordion}>
                <AccordionTitle>{title}</AccordionTitle>
                <Icon
                    name={
                        isOpen ? "chevron-up-outline" : "chevron-down-outline"
                    }
                    color="#303030"
                    size={20}
                />
            </AccordionHeader>
            {isOpen && <AccordionContent>{children}</AccordionContent>}
        </>
    );
};
