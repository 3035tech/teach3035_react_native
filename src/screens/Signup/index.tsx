import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import {
    Background,
    Bottom,
    Card,
    EnterAccount,
    LinkText,
    Logo,
    Row,
    Title,
} from "./styles";
import { Button } from "../../components/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "styled-components";
import { TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthRoutesStackParamsList } from "../../routes/auth.routes";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../libs/firebase";
import { ToastMessage } from "../../components/ToastMessage";

const FormSchema = z.object({
    name: z
        .string({ required_error: "O nome deve ser informado" })
        .min(1, { message: "O nome deve ser informado" }),

    email: z
        .string({ required_error: "Email deve ser informado" })
        .email({ message: "O email deve ser válido" }),

    password: z
        .string({ required_error: "Senha deve ser informada" })
        .min(6, { message: "A senha precisa ter no mínimo 6 caracteres" }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

type Props = StackScreenProps<AuthRoutesStackParamsList, "Signup">;

export const Signup = ({ navigation: { navigate } }: Props) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const methods = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
    });

    const { handleSubmit } = methods;

    const handleSignUp = async ({ name, email, password }: FormSchemaType) => {
        setError("");
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            updateProfile(response.user, {
                displayName: name,
            });
        } catch (error) {
            setError("Não foi possível criar a sua conta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: theme.colors.white,
            }}
            showsHorizontalScrollIndicator={false}
        >
            <Background>
                <Logo xml={logo} />
                <Card>
                    {error ? <ToastMessage>{error}</ToastMessage> : null}
                    <Title>Cadastre-se</Title>
                    <FormProvider {...methods}>
                        <Input
                            label="Nome"
                            name="name"
                            placeholder="Digite seu nome"
                            returnKeyType="next"
                        />
                        <Input
                            label="E-mail"
                            name="email"
                            placeholder="Digite seu e-mail"
                            keyboardType="email-address"
                            autoComplete="off"
                            autoCapitalize="none"
                            returnKeyType="next"
                        />
                        <Input
                            label="Senha"
                            name="password"
                            placeholder="Digite sua senha"
                            autoCapitalize="none"
                            autoComplete="off"
                            returnKeyType="done"
                            keyboardType="default"
                            secureTextEntry
                        />
                    </FormProvider>
                    <Bottom>
                        <Button
                            isLoading={loading}
                            children="Cadastrar"
                            onPress={handleSubmit(handleSignUp)}
                        />
                        <Row>
                            <EnterAccount>Não possui conta?</EnterAccount>
                            <TouchableOpacity
                                onPress={() => navigate("Signin")}
                            >
                                <LinkText>Entrar</LinkText>
                            </TouchableOpacity>
                        </Row>
                    </Bottom>
                </Card>
            </Background>
        </KeyboardAwareScrollView>
    );
};
