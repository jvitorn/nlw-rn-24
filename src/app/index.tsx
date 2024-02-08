import { CategoryBtn } from "@/components/category-btn"
import { Header } from "@/components/header"
import { Product } from "@/components/product"
import { CATEGORIES, MENU } from "@/utils/data/products"
import { useCardStore } from "@/stores/cart-store"
import { View, FlatList, SectionList, Text } from "react-native"
import { useState, useRef } from "react"
import { Link } from "expo-router"

export default function Home() {
    const cartStore = useCardStore()
    // função que atualiza o estado
    const [category, setCategorySelected] = useState(CATEGORIES[0])
    // referencia da sessão 
    const sectionListRef = useRef<SectionList>(null)

    const cartQdtItens = cartStore.products.reduce((total,product) => total + product.quantity,0)
    // handle que muda a categoria conforme selecionada
    const handleCategorySelected = (selectedCategory: string) => {
        setCategorySelected(selectedCategory)

        const sectionIdx = CATEGORIES.findIndex((cSelect) => cSelect === selectedCategory)

        if (sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                animated: true,
                sectionIndex: sectionIdx,
                itemIndex: 0
            })
        }
    }

    return (
        <View className="flex-1 pt-8">
            {/* titulo */}
            <Header title="Faça seu pedido" cartQdt={cartQdtItens} />
            {/* semelhante a um repeat: usada para renderizar listas simples e homogêneas, */}
            <FlatList
                data={CATEGORIES}
                keyExtractor={(i) => i}
                // mostra o que vai ser renderizado
                renderItem={
                    ({ item }) =>
                        <CategoryBtn title={item}
                            isSelected={item === category}
                            onPress={() => handleCategorySelected(item)} />}
                horizontal
                className="max-h-10 mt-5"
                // configuração para não mostrar a barra horizontal
                showsHorizontalScrollIndicator={false}
                // espaçamento 
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
            />
            {/* semelhante a um repeat: projetada para renderizar listas com seções */}
            <SectionList
                ref={sectionListRef}
                sections={MENU}
                keyExtractor={(i) => i.id}
                stickySectionHeadersEnabled={false}
                // conteudo dos lanches
                renderItem={({ item }) => (
                    <Link href={`/product/${item.id}`} asChild>
                        <Product data={item} />
                    </Link>
                )}
                // titulo das categorias
                renderSectionHeader={({ section: { title } }) => (
                    <Text className="text-xl text-white font-heading mt-8 mb-3">
                        {title}
                    </Text>
                )}
                className="flex-1 p-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

        </View>
    )
}