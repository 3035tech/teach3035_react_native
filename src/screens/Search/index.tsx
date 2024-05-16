import React, { useCallback, useRef, useState } from "react";
import { Keyboard, Text } from "react-native";
import { SearchInput } from "../../components/SearchInput";
import {
    BottomSheetModal,
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import { Header } from "../../components/Header";
import { Container, SearchContainer } from "./styles";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";
import { Filters } from "../../components/Filters";
import { RecipeDifficulty } from "../../constants/recipeDifficulty";

type DifficultyOption = RecipeDifficulty;
type Props = StackScreenProps<RootStackParamList, "Search">;
export const Search = ({ navigation, route: { params } }: Props) => {
    const [search, setSearch] = useState("");
    const { callbackScreen, category } = params;

    const [difficulties, setDifficulties] = useState([] as DifficultyOption[]);
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );
    const handlePresentBottomSheet = () => {
        Keyboard.dismiss();
        bottomSheetRef.current?.present();
    };
    const handleCloseBottomSheet = () => {
        Keyboard.dismiss();
        bottomSheetRef.current?.close();
    };

    const handleSubmit = () => {
        navigation.replace(callbackScreen, {
            searchTerm: search,
            difficulties,
            category,
        });
    };
    return (
        <Container>
            <Header
                title=""
                onBack={() => {
                    navigation.goBack();
                }}
            />
            <SearchContainer>
                <SearchInput
                    placeholder="Pesquisar receitas"
                    autoComplete="off"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus
                    onSubmitEditing={handleSubmit}
                    value={search}
                    onChangeText={setSearch}
                    onClickFilter={handlePresentBottomSheet}
                />
            </SearchContainer>

            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={["90%"]}
                enableDismissOnClose
                enablePanDownToClose
                backdropComponent={renderBackdrop}
            >
                <Filters
                    handleClose={handleCloseBottomSheet}
                    onSubmit={({ difficulties }) => {
                        handleCloseBottomSheet();
                        setDifficulties(difficulties);
                    }}
                />
            </BottomSheetModal>
        </Container>
    );
};
