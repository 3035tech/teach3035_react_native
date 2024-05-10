import React, { useState } from "react";
import { Container, Content, Input, InputContainer, Label } from "./styles";
import { Header } from "../../components/Header";
import { useUser } from "../../hooks/useUser";
import { updateProfile } from "firebase/auth";

export const Profile = () => {
    const [user, setUser] = useUser();
    const [name, setName] = useState(user?.displayName || "");

    const handleSaveName = async () => {
        if (!user) return;

        if (name !== user?.displayName) {
            await updateProfile(user, {
                displayName: name,
            });

            user.reload();
            setUser({ ...user, displayName: name });
        }
    };

    return (
        <Container>
            <Header title="Perfil" logout />
            <Content>
                <InputContainer>
                    <Label>Nome</Label>
                    <Input
                        value={name}
                        onChangeText={setName}
                        onBlur={handleSaveName}
                        onSubmitEditing={handleSaveName}
                    />
                </InputContainer>

                <InputContainer>
                    <Label>E-mail</Label>
                    <Input value={user?.email!} editable={false} blocked />
                </InputContainer>
            </Content>
        </Container>
    );
};
