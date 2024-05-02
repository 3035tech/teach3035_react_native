import React, { useState } from "react";
import { Container, Content, Input, InputContainer, Label } from "./styles";
import { Header } from "../../components/Header";

export const Profile = () => {
    const [name, setName] = useState("Jonas");
    const [email, setEmail] = useState("email@email.com");

    return (
        <Container>
            <Header title="Perfil" logout />
            <Content>
                <InputContainer>
                    <Label>Nome</Label>
                    <Input value={name} onChangeText={setName} />
                </InputContainer>

                <InputContainer>
                    <Label>E-mail</Label>
                    <Input value={email} editable={false} blocked />
                </InputContainer>
            </Content>
        </Container>
    );
};
