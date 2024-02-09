import { View, Image, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, Redirect } from "expo-router";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-btn";
import { useCardStore } from "@/stores/cart-store";

export default function Product() {
    const cartStore = useCardStore()
    const navigation = useNavigation()
    const { id } = useLocalSearchParams()

    const product = PRODUCTS.find((i) => i.id === id)

    const handleAddToCart = () => {
        if (product) {
            cartStore.add(product)
            navigation.goBack()
        }

    }

    if (!product) return <Redirect href="/" />

    return (
        <View className="flex-1">
            <Image source={product.cover} className="w-full h-52" resizeMode="cover" />
            <View className="p-5 mt-8 flex-1">
                <Text className="text-white text-xl font-heading">{product.title.toUpperCase()}</Text>
                {/* preço */}
                <Text className="text-lime-400 text-2xl font-heading my-2">
                    {formatCurrency(product.price)}
                </Text>

                <Text className="text-slate-400 font-body text-base leading-6 mb-2">
                    {product.description}
                </Text>

                <Text className="text-xl text-white font-heading mt-8 mb-3">
                    Ingredientes:
                </Text>
                {product.ingredients.map((ingredient) => (
                    <Text key={ingredient} className="text-slate-400 font-body text-base leading-6">
                        {"\u2023"}  {ingredient}
                    </Text>
                ))}
            </View>

            {/* Button */}
            <View className="p-5 pb-8 gap-5">
                <Button onPress={handleAddToCart}>
                    <Button.Icon>
                        <Feather name="plus-circle" size={20} />
                    </Button.Icon>
                    <Button.Text>Adicionar ao Pedido</Button.Text>
                </Button>

                <LinkButton title="Voltar" href="/"></LinkButton>
            </View>
        </View>
    )
}