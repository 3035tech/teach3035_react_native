import React from "react";
import onboarding from "../../../assets/onboarding3.jpeg";
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

type Props = StackScreenProps<AuthRoutesStackParamsList, "OnboardingThirdPage">;
export const OnboardingThirdPage = ({ navigation: { navigate } }: Props) => {
    return (
        <View style={{ flex: 1 }}>
            <Background source={onboarding} resizeMode="cover">
                <Overlay />

                <TextContainer>
                    <Title>Seu livro de receitas particular</Title>
                    <Info>
                        Salve suas receitas <Bold>favoritas</Bold> para cozinhar
                        no dia-a-dia ou guarde para prepará-las em ocasiões
                        especiais junto com seus amigos e família..
                    </Info>

                    <Button
                        children="Próxima"
                        onPress={() => navigate("Signin")}
                    />
                </TextContainer>
            </Background>
        </View>
    );
};
