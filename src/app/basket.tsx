import { useState } from "react"
import { View, Text, ScrollView, Alert } from "react-native"
import { Feather } from "@expo/vector-icons"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { Header } from "@/components/header"
import { Product } from "@/components/product"

import { formatCurrency } from "@/utils/functions/format-currency"

import { ProductCartProps, useCardStore } from "@/stores/cart-store"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { LinkButton } from "@/components/link-btn"



export default function Basket() {
    const [address, setAddress] = useState("");

    const cartStore = useCardStore()

    const total = formatCurrency(cartStore.products.reduce((total, p) => total + (p.price * p.quantity), 0))


    function handleProductRemove(product: ProductCartProps) {
        Alert.alert("Remover", `Deseja remover ${product.title.toUpperCase()} do carrinho?`, [
            {
                text: "Cancelar",

            },
            {
                text: "Remover",
                onPress: () => cartStore.remove(product.id)
            }
        ])
    }

    function handleOrder() {
      if(address.trim().length === 0) {
        return Alert.alert("Pedido","Informe os dados da entrega")
      }

      const products = cartStore.products.map((p)=>`\n (${p.quantity}x) - ${p.title}`).join("")

      const message = `
      🌟 **[NOVO PEDIDO]** 🌟
    
      Informações de Entrega: ${address}
      
      ${products}
      
      Total do Pedido: ${total}
      `

      console.log(message)
    }

    return <View className="flex-1 pt-8">
        <Header title="Carrinho" />
        {/* ios */}
        <KeyboardAwareScrollView>
            <ScrollView>
                <View className="p-5 flex-1">
                    {
                        cartStore.products.length > 0 ? (
                            <View className="border-b border-slate-700">

                                {
                                    cartStore.products.map((p) => (
                                        <Product key={p.id} data={p}
                                            onPress={() =>
                                                handleProductRemove(p)} />
                                    ))
                                }
                            </View>

                        ) : (
                            <Text className="font-body text-slate-400 text-center my-8"> Carrinho vazio...</Text>
                        )
                    }

                    <View className="flex-row gap-2 items-center mt-5 mb-4 justify-center">
                        <Text className="text-white text-xl font-subtitle">Total:</Text>
                        <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
                    </View>

                    <Input 
                    onChangeText={setAddress}
                    placeholder="Informe o Endereço de entrega com Rua, Bairro, CEP, nº e complemento" />
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
        {/* botao de enviar pedido */}
        <View className="p-5 gap-5">
            <Button onPress={handleOrder}>
                <Button.Text>
                    Enviar Pedido
                </Button.Text>
                <Button.Icon>
                    <Feather name="arrow-right-circle" size={20}></Feather>
                </Button.Icon>
            </Button>
            <LinkButton title="Voltar ao Menu" href="/"></LinkButton>
        </View>

    </View>
}