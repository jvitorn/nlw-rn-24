import { CategoryBtn } from "@/components/category-btn"
import { Header } from "@/components/header"
import { CATEGORIES } from "@/utils/data/products"
import { View, FlatList } from "react-native"
import { useState } from "react"


export default function Home() {
    // função que atualiza o estado
    const [categorySelected, setCategorySelected] = useState(CATEGORIES[0])
    // handle que muda a categoria conforme selecionada
    const handleCategorySelected = (selectedCategory: string) => setCategorySelected(selectedCategory)

    return (
        <View className="flex-1 pt-8">
            {/* titulo */}
            <Header title="Faça seu pedido" cartQdt={5} />
            {/* semelhante a um ng-repeat */}
            <FlatList
                data={CATEGORIES}
                keyExtractor={(i) => i}
                // mostra o que vai ser renderizado
                renderItem={
                    ({ item }) =>
                        <CategoryBtn title={item}
                            isSelected={item === categorySelected}
                            onPress={() => handleCategorySelected(item)} />}
                horizontal
                className="max-h-10 mt-5"
                // configuração para não mostrar a barra horizontal
                showsHorizontalScrollIndicator={false}
                // espaçamento 
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
            />

        </View>
    )
}