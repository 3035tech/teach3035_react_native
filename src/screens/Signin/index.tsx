import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import {
    Background,
    Card,
    CreateAccount,
    LinkText,
    Logo,
    Row,
    Title,
    Bottom,
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
import { ToastMessage } from "../../components/ToastMessage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../libs/firebase";

const FormSchema = z.object({
    email: z
        .string({ required_error: "Email deve ser informado" })
        .email({ message: "O email deve ser válido" }),

    password: z
        .string({ required_error: "Senha deve ser informada" })
        .min(6, { message: "A senha precisa ter no mínimo 6 caracteres" }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

type Props = StackScreenProps<AuthRoutesStackParamsList, "Signin">;

export const Signin = ({ navigation: { navigate } }: Props) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const methods = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
    });

    const { handleSubmit } = methods;

    const handleSignIn = async ({ email, password }: FormSchemaType) => {
        setLoading(true);
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError("E-mail ou senha inválida");
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
                    <Title>Entrar</Title>
                    <FormProvider {...methods}>
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
                            children="Entrar"
                            onPress={handleSubmit(handleSignIn)}
                        />
                        <Row>
                            <CreateAccount>Não possui conta?</CreateAccount>
                            <TouchableOpacity
                                onPress={() => navigate("Signup")}
                            >
                                <LinkText>Cadastre-se</LinkText>
                            </TouchableOpacity>
                        </Row>
                    </Bottom>
                </Card>
            </Background>
        </KeyboardAwareScrollView>
    );
};
