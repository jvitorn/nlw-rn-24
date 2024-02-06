import { ActivityIndicator, View } from "react-native";
import colors from "tailwindcss/colors"
export function Loading() {
    return (
        <View className="flex-1 items-center justify-center bg-slate-900">
            {/* indicador do react native para verificar se a pagina foi carregada */}
            <ActivityIndicator color={colors.white} />
        </View>
    )
}