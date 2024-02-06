import { View, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
//Definindo todas as props do component
type HeaderProps = {
    title: string,
    cartQdt?: number
}

export function Header({ title, cartQdt = 0 }: HeaderProps) {
    return (
        // para alinhar todo o conteudo
        <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
            {/* titulo com logo */}
            <View className="flex-1">
                <Image source={require("@/assets/logo.png")} className="h-6 w-32" />
                <Text className="text-white text-xl font-heading mt-2">
                    {title}
                </Text>
            </View>
            {/* Mostra a quantidade de itens no carrinho - equivalente a um IF */}
            {
                cartQdt > 0 && (
                    // Caso não tenha itens no carrinho, não é necessario mostrar
                    <TouchableOpacity className="relative" activeOpacity={0.7}>
                        {/* Itens no Carrinho */}
                        <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
                            <Text className="text-slate-900 font-bold text-xs">{cartQdt}</Text>
                        </View>
                        {/* Icon carrinho */}
                        <Feather name="shopping-bag" color={colors.white} size={24} />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}