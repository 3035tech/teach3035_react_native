import React from "react";
import onboarding from "../../../assets/onboarding1.jpeg";
import { View } from "react-native";
import {
    Background,
    Bold,
    Category,
    ChipsContainer,
    FilterContainer,
    Info,
    Label,
    Overlay,
    TextContainer,
    Title,
} from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { Chip } from "../../../components/Chip";
import { Button } from "../../../components/Button";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthRoutesStackParamsList } from "../../../routes/auth.routes";

type Props = StackScreenProps<AuthRoutesStackParamsList, "OnboardingFirstPage">;
export const OnboardingFirstPage = ({ navigation: { navigate } }: Props) => {
    return (
        <View style={{ flex: 1 }}>
            <Background source={onboarding} resizeMode="cover">
                <Overlay />
                <FilterContainer>
                    <Category>
                        <Label>Categorias</Label>
                        <Icon
                            name="chevron-up-outline"
                            size={20}
                            color="#fff"
                        />
                    </Category>
                    <ChipsContainer>
                        <Chip label="Almoço" />
                        <Chip label="Lanche" />
                        <Chip label="Jantar" />
                    </ChipsContainer>
                </FilterContainer>
                <TextContainer>
                    <Title>Receitas do seu jeito</Title>
                    <Info>
                        Utilize a <Bold>Busca personalizada</Bold> para
                        encontrar receitas com as{" "}
                        <Bold>especificações desejadas</Bold>.
                    </Info>

                    <Button
                        children="Próxima"
                        onPress={() => navigate("OnboardingSecondPage")}
                    />
                </TextContainer>
            </Background>
        </View>
    );
};
