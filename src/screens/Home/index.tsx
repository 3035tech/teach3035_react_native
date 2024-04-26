import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import {
    Container,
    Header,
    Name,
    Row,
    SearchContainer,
    StyledCustomSearchButton,
    Title,
    Welcome,
} from "./styles";

import { ScrollView, Image, View, FlatList, Dimensions } from "react-native";

import avatar from "../../assets/avatar.png";
import React from "react";
import { SearchInput } from "../../components/SearchInput";
import { CategoryCard } from "../../components/CategoryCard";
import { RecipeCard } from "../../components/RecipeCard";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";
import { RECIPES } from "../../mocks/recipes";

const CATEGORIES = [
    {
        id: 1,
        imageUri:
            "https://img.freepik.com/fotos-premium/derramar-cafe-com-fumaca-em-um-copo-com-paes-ou-pao-croissant-e-padaria-na-mesa-de-madeira-branca_126277-491.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1706054400&semt=ais",
        name: "Café da manhã",
    },
    {
        id: 2,
        imageUri:
            "https://img.freepik.com/fotos-gratis/composicao-de-comida-brasileira-deliciosa-de-alto-angulo_23-2148739223.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1713916800&semt=sph",
        name: "Almoço",
    },
    {
        id: 3,
        imageUri:
            "https://img.freepik.com/fotos-premium/variedade-de-lanches-na-caixa-publicidade-profissional-fotografia-de-alimentos-gerada-por-ia_920594-2190.jpg?w=2000",
        name: "Lanches",
    },
];

type Props = StackScreenProps<RootStackParamList>;

export const Home = ({ navigation: { navigate } }: Props) => {
    const insets = useSafeAreaInsets();
    const { width } = Dimensions.get("window");
    return (
        <Container topInset={insets.top}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header>
                    <Image source={avatar} />
                    <View>
                        <Name>Olá, Jonas!</Name>
                        <Welcome>Qual receita vamos aprender hoje?</Welcome>
                    </View>
                </Header>
                <SearchContainer>
                    <SearchInput placeholder="Pesquisar receitas" />
                </SearchContainer>
                <StyledCustomSearchButton
                    onPress={() => navigate("CustomSearch")}
                />

                <Row>
                    <Title> Categorias</Title>
                    <Icon name="chevron-forward" size={20} />
                </Row>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => String(item.id)}
                    data={CATEGORIES}
                    contentContainerStyle={{
                        paddingTop: 16,
                        paddingLeft: 20,
                        gap: 12,
                    }}
                    renderItem={({ item }) => (
                        <CategoryCard
                            categoryName={item.name}
                            imageUri={item.imageUri}
                            onPress={() => {}}
                        />
                    )}
                />

                <Row>
                    <Title> Descubra</Title>
                    <Icon name="chevron-forward" size={20} />
                </Row>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => String(item.id)}
                    data={RECIPES}
                    contentContainerStyle={{
                        paddingTop: 16,
                        paddingLeft: 20,
                        gap: 12,
                    }}
                    renderItem={({ item }) => (
                        <RecipeCard
                            style={{ width: width * 0.45 }}
                            id={String(item.id)}
                            name={item.name}
                            calories={item.calories}
                            imageUri={item.imageUri}
                            difficulty={item.difficulty}
                            isFavorited={item.isFavorited}
                            preparationTime={item.preparationTime}
                            onFavoritePress={() => console.log("favorito")}
                            onPress={() => console.log("onPress")}
                            heightVariant="small"
                        />
                    )}
                />
            </ScrollView>
        </Container>
    );
};
