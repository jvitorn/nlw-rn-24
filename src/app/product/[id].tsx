import { View, Image, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";

export default function Product() {
    const { id } = useLocalSearchParams()

    const product = PRODUCTS.filter((i) => i.id === id)[0]

    return (
        <View className="flex-1">
            <Image source={product.cover} className="w-full h-52" resizeMode="cover" />

            <View className="p-5 mt-8 flex-1">
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
        </View>
    )
}