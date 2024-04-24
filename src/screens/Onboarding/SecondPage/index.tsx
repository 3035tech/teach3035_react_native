import React from "react";
import onboarding from "../../../assets/onboarding2.jpeg";
import { View } from "react-native";
import {
    Background,
    Bold,
    Info,
    Overlay,
    TextContainer,
    Title,
} from "./styles";
import { Button } from "../../../components/Button";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthRoutesStackParamsList } from "../../../routes/auth.routes";

type Props = StackScreenProps<
    AuthRoutesStackParamsList,
    "OnboardingSecondPage"
>;

export const OnboardingSecondPage = ({ navigation: { navigate } }: Props) => {
    return (
        <View style={{ flex: 1 }}>
            <Background source={onboarding} resizeMode="cover">
                <Overlay />

                <TextContainer>
                    <Title>Organize sua alimentação</Title>
                    <Info>
                        Nos detalhes de cada receita, sao mostradas informações
                        como{" "}
                        <Bold>calorias, tempo e dificuldade de preparo</Bold>.
                    </Info>

                    <Button
                        children="Próxima"
                        onPress={() => navigate("OnboardingThirdPage")}
                    />
                </TextContainer>
            </Background>
        </View>
    );
};
